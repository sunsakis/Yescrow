import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";

const ABI = [
  "function createDepositERC721(address _seller, address _token, uint256[] calldata _tokenIds) external",
  "function approve(address to, uint256 tokenId) public virtual override",
  "event NewDepositERC721(uint256 indexed currentId, address indexed buyer, address indexed seller, address token, uint256[] tokenIds)"
  ];

export const injected = new InjectedConnector({ supportedChainIds: [1, 11155111] });

export default function EscrowForm() {

  const [_tokenIds, setIDValue] = useState('')
  const [_seller, setSellerAddress] = useState('')
  const [_nftAddress, setNftAddress] = useState('')
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [accounts, setAccounts] = useState('');

  function handleIDChange(e) {
    setIDValue(e.target.value);
    
  }

  function handleAddressChange(e) {
    setSellerAddress(e.target.value);
  }

  function handleNftAddressChange(e) {
    setNftAddress(e.target.value);
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetaMask(true);
    }
  },[]);

  const {
    active,
    activate,
    chainId,
    account,
    library: provider,
  } = useWeb3React();

  async function blockchainTalk(e) {
    e.preventDefault(); 
    if (hasMetaMask == true) {
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x11155111') {
        alert('Please connect to the Ethereum Sepolia.')
      }
      if (chainId == '0x11155111') {try {
        await activate(injected);
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length == 0) { setAccounts("Connect your Metamask account") } else 
        { setAccounts("Your Ethereum account "+accounts+" is now connected to Ethereum`s Sepolia. You may escrow now.") }
      } catch (e) {
        console.log(e);
      }
      }
      try {
      if (active) {

        const signer = provider.getSigner();
        const contract = new ethers.Contract(process.env.NEXT_PUBLIC_SEPOLIA_ADDRESS, ABI, signer);
        try { await contract.approve(contract.address, _tokenIds) }
        catch (error) {alert("The transaction failed. Please make sure you approve escrowing the NFTs in your Metamask account and try again.")}
        try { await contract.createDepositERC721(_seller, _nftAddress, _tokenIds) }
        catch (error) {alert("The transaction failed. Please make sure you have enough NFTs in your Metamask account and try again.")}
        
        try {
          contract.on("NewDepositERC721", (counter, buyerAddress, sellerAddress, _nftAddress, _tokenIds, event) => {
            provider.once("block", () => {
              console.log(
                "Buyer address: "+buyerAddress,
                "Seller address: "+sellerAddress,
                "Escrow amount: "+_tokenIds,
                "Escrow ID: "+counter,
                "Buyer's NFT address: "+_nftAddress,
                "Transaction hash: "+event.transactionHash);

                alert("Your escrow has been created. Please check your e-mail for the ID and transaction hash.");}
            ) 
          })
         } catch (error) {console.log(error)};
      }
     } catch {alert("Fix the error and please make sure to fill in the form correctly.")};
      
    } else {
      alert("Please install MetaMask browser extension.");
    }
  }

  return (
          <div className={styles.main}>
          <form id="formId" className={styles.form} onSubmit={blockchainTalk}>
              {/* Should alert if user clicks button but is not connected to mainnet */}
                <h1 className={styles.title}>♦ Ethereum escrow for NFTs</h1>
              <br/>
              <p>When selling your NFT, safety matters - the only way to trust anonymously is to use an escrow.</p>
              <div className={styles.description}>
                <label>Buyer`s Ethereum address</label><br/>
                <input className={styles.input}
                  type="text" 
                  placeholder="0x..." 
                  required
                  minLength="42"
                  maxLength="42"
                  onChange={handleAddressChange} 
                /><br/>
                <label>NFT address</label><br/>
                <input className={styles.input}
                  type="text" 
                  placeholder="0x..."
                  minLength="42"
                  maxLength="42"
                  onChange={handleNftAddressChange} 
                  required
                  /><br/>
                <label>NFT ID</label><br/>
                <input className={styles.input}
                  type="number" 
                  placeholder="#" 
                  step="1"
                  onChange={handleIDChange}
                  required 
                  />
                <br /><br />
                <button type="submit">♦ Escrow</button>
              </div>
            </form>
            <div>
              <code>{accounts}</code>
              </div>
        </div>
  )
}
