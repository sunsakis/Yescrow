import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";
import Link from 'next/link';

const ABI = [
  "function createDepositETH(address _seller) external payable",
  "event NewDepositETH(uint256 indexed currentId, address indexed buyer, address indexed seller, uint256 amount)"
  ];

export const injected = new InjectedConnector({ supportedChainIds: [1, 11155111] });

export default function EthEscrowForm() {

  const [amount, setDepositValue] = useState('')
  const [_seller, setSellerAddress] = useState('')
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [accounts, setAccounts] = useState('');
  const [isConnected, setIsConnected] = useState(false);

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
      if (chainId == "0x1") {
        try {
          await activate(injected);
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts.length == 0) {
            alert("Connect your Metamask account"); } else {
            setAccounts("Your Ethereum account "+accounts+" is connected. You may escrow now.")  
            if (isConnected == false) {
              setIsConnected(true);
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
      try {
      if (active) {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MAINNET_ADDRESS, ABI, signer);
        try { await contract.createDepositETH(_seller, { value: ethers.utils.parseEther(amount) })}
        catch (error) {alert("The transaction failed. Please make sure you have enough ETH in your Metamask account and try again.")}
        try {
          contract.on("NewDepositETH", (counter, buyerAddress, sellerAddress, depositAmount, event) => {
              console.log(
                "Buyer address: "+buyerAddress,
                "Seller address: "+sellerAddress,
                "Escrow amount: "+JSON.stringify(depositAmount.toString()),
                "Escrow ID: "+counter,
                "Transaction hash: "+event.transactionHash);
                alert("Appreciate the patience. Your escrow has been created. Save your ID#: " +counter+ ".")
          })
         } catch (error) {console.log(error)};
      }
     } catch {alert("Fix the error and please make sure to fill in the form correctly.")};
      
    } else {
      alert("Please install MetaMask browser extension.");
    }
  }

  return (
          <div>
          <form id="formId" className={styles.form} onSubmit={blockchainTalk}>
              {/* Should alert if user clicks button but is not connected to mainnet */}
                <h2 className={styles.title}><span className={styles.symbol}>♦</span> Ether Escrow</h2>
              <br/>
              <p>When transacting on the internet - use protection: the only way to trust a stranger online is to use an escrow.</p>
              <div className={styles.description}>
                <label>Receiver`s Ethereum address</label><br/>
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
                <br/><code><small>{accounts}</small></code><br/><br/>
              </div>
            </form>
            <h3>
            Share your transaction hash to prove you have escrowed the funds.<br />
        <br />
        Then let the other party do their part.
      </h3><br/>
      <h4>
      <Link href="/eth/escrow">
      Release the escrow
      </Link> 
      {" "}when you are happy.</h4><br/>
      <p>It`s that simple.</p>
      <br />
      <br />
        </div>
  )
}
