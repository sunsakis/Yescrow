import Head from 'next/head'
import Image from "next/image";
import Link from "next/link";
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";

export const injected = new InjectedConnector();

const contractAddress = "0x2d9b0a6620F89031bc36491aDfAa1b174fcB1194"

const ABI = [
  "function safeDeposit(address _seller, string memory _email) external payable",
  "event NewDeposit(address buyerAddress, address sellerAddress, uint amount, uint256 counter, string email)"
];

export default function Home() {

  const [amount, setDepositValue] = useState('')
  const [_seller, setSellerAddress] = useState('')
  const [email, setEmailAddress] = useState('')
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [accounts, setAccounts] = useState('');

  function handleDepositChange(e) {
    setDepositValue(e.target.value);
    
  }

  function handleAddressChange(e) {
    setSellerAddress(e.target.value);
  }

  function handleEmailChange(e) {
    setEmailAddress(e.target.value);
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetaMask(true);
    }
  });

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
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (chainId !== '0x1') {
        alert('Please connect to the Ethereum Mainnet.')
      }
      if (chainId == '0x1') {try {
        await activate(injected);
        setAccounts("Your Ethereum account "+accounts+" is now connected to the Ethereum Mainnet. Click 'Escrow' to proceed.")
      } catch (e) {
        console.log(e);
      }
      }
      try {
      if (active) {

        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        try { await contract.safeDeposit(_seller, email, { value: ethers.utils.parseEther(amount)}) }
        catch (error) {alert(error)}
        
        try {
          contract.on("NewDeposit", (buyerAddress, sellerAddress, depositAmount, counter, email, event) => {
            provider.once("block", () => {
              console.log(
                "Buyer address: "+buyerAddress,
                "Seller address: "+sellerAddress,
                "Escrow amount: "+JSON.stringify(depositAmount.toString()),
                "Escrow ID: "+counter,
                "Buyer's e-mail: "+email,
                "Transaction hash: "+event.transactionHash);

                alert("Your escrow has been created. Please check your e-mail for the ID and transaction hash.");}
            ) 
          })
         } catch (error) {console.log(error)};
      }
     } catch {alert("After the error, please refresh the page and fill in the form correctly.")};
      
    } else {
      alert("Please install MetaMask browser extension.");
    }
  }
   
  return (
    <div className={styles.container}>
      <Head>
        <title>The smart contract escrow of Ethereum : Yescrow</title>
        <meta name="description" content="The fastest, cheapest and simply the most simple way to escrow your money." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>  
          <div className={styles.main}>
          <form id="formId" className={styles.form} onSubmit={blockchainTalk}>
              {/* Should alert if user clicks button but is not connected to mainnet */}
                <h1 className={styles.title}>Crypto escrow built on Ethereum ♦</h1>
              <br></br>
              <div className={styles.description}>
                <label>Seller's Ethereum address</label><br/>
                <input
                  type="text" 
                  placeholder="0x..." 
                  required
                  minLength="42"
                  maxLength="42"
                  onChange={handleAddressChange} 
                /><br/>
                <label>Your e-mail</label><br/>
                <input 
                  type="email" 
                  placeholder="your@ddress.com" 
                  onChange={handleEmailChange} 
                  required
                  /><br/>
                <label>ETH escrow amount</label><br/>
                <input 
                  type="number" 
                  placeholder="Ξ" 
                  step="any"
                  min="0.1"
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
              <h2 className={styles.description}>Escrow services, secured on the blockchain by Ledger</h2>
            </div>
            <div>
              <h3>How to use a crypto escrow?</h3>
              <div>
              <ul className={styles.card}>
                <b>!</b> Parties negotiate their terms in private (amount, delivery time).<br/><br/>
                <b>#</b> To escrow Ether, buyer provides the seller's address.<br/><br/>
                <b>@</b> Buyer is assigned a unique ID to his/her deposit.<br/><br/>
                <b>$</b> Buyer can <Link href="/release">release the escrow</Link> using the ID as a key.<br/><br/>
                <b>%</b> In case of disagreement, crow@yescrow.xyz can settle it for 5%.
              </ul><br/>
              <h4>Any questions?<br /><br /> Ask the <br />crow@yescrow.xyz <br/>
              <br/> OR <br/><br/> Annoy <br/><br/>the dev<br/> on <br/><br/><a href="https://t.me/sunsakis" rel="nofollow">Telegram</a></h4>
              </div>            
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
      Putting money where the mouth is since 2023
      </footer>
    </div>
  )
}
