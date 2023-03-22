import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";

const ABI = [
  "function createDepositETH(address _seller) external payable",
  "event NewDepositETH(uint256 indexed currentId, address indexed buyer, address indexed seller, uint256 amount)"
  ];

export const injected = new InjectedConnector({ supportedChainIds: [11155111] });

export default function EthEscrowForm() {

  const [amount, setDepositValue] = useState('')
  const [_seller, setSellerAddress] = useState('')
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [accounts, setAccounts] = useState('');

  function handleDepositChange(e) {
    setDepositValue(e.target.value);
  }

  function handleAddressChange(e) {
    setSellerAddress(e.target.value);
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
      if (chainId !== '0xaa36a7') {
        console.log(chainId)
        alert('Please connect to the Ethereum Sepolia.')
      }
      if (chainId == '0xaa36a7') {try {
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
        const contract = new ethers.Contract("0x4193f089C9e41135329c989a0899B60B101C3994", ABI, signer);
        try { await contract.createDepositETH(_seller, { value: ethers.utils.parseEther(amount) }) }
        catch (error) {alert("The transaction failed. Please make sure you have enough ETH in your Metamask account and try again.")}
        
        try {
          contract.on("NewDepositETH", (counter, buyerAddress, sellerAddress, depositAmount, event) => {
            provider.once("block", () => {
              console.log(
                "Buyer address: "+buyerAddress,
                "Seller address: "+sellerAddress,
                "Escrow amount: "+JSON.stringify(depositAmount.toString()),
                "Escrow ID: "+counter,
                "Transaction hash: "+event.transactionHash);

                alert("Appreciate the patience. Your escrow has been mined. Save your ID number: " +counter +".")}
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
                <h1 className={styles.title}>Escrow Ethereum ♦</h1>
              <br/>
              <p>When buying online, safety matters - the only way to trust anonymously is to use an escrow.</p>
              <div className={styles.description}>
                <label>Seller`s Ethereum address</label><br/>
                <input className={styles.input}
                  type="text" 
                  placeholder="0x..." 
                  required
                  minLength="42"
                  maxLength="42"
                  onChange={handleAddressChange} 
                /><br/>
                <label>Escrow amount in ETH</label><br/>
                <input className={styles.input}
                  type="number" 
                  placeholder="Ξ" 
                  step="any"
                  onChange={handleDepositChange} 
                  />
                <br />
                <code>0.5% fee + gas</code>
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
