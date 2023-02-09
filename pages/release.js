import { ethers } from "ethers";
import Head from 'next/head';
import Link from "next/link";
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import { injected } from ".";


const contractAddress = "0x2d9b0a6620F89031bc36491aDfAa1b174fcB1194"

const ABI = [
  "function releaseDeposit(uint256 id) external",
  "event DepositReleased(address buyerAddress, address sellerAddress, uint256 releaseAmount, uint256 counter)",
];

export default function Release() {

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


    const [_id, setID] = useState('')
    const [hasMetaMask, setHasMetaMask] = useState(false);
    const [accounts, setAccounts] = useState('');

    function handleIDChange(e) {
        setID(e.target.value);
    }

  async function releaseEscrow(e) {
    e.preventDefault();
  //Check if MetaMask is installed
  if(hasMetaMask == true) {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const chainId = await window.ethereum.request({ method: 'eth_chainId'});
    // Check if user is connected to Mainnet
    if(chainId !== '0x1') {
      alert("Please connect to the Ethereum Mainnet.");
    }
    if (chainId == '0x1') {try {
        await activate(injected);
        setAccounts("Your Ethereum account "+accounts+" is connected to the Ethereum Mainnet. Input your ID and hit 'Release'.")
      } catch (e) {
        console.log(e);
      }
      }
      try {
        if (active) {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        try { await contract.releaseDeposit(_id, {gasLimit: 250000}) }
        catch (error) {alert("Please type in your ID correctly.")};
        
        try{
        contract.on("DepositReleased", (buyerAddress, sellerAddress, releaseAmount, counter, event) => {
          console.log("Buyer address: "+buyerAddress,
          "Seller address: "+sellerAddress,
          "Escrow amount: "+JSON.stringify(releaseAmount.toString()),
          "ID: "+counter, 
          "Transaction hash: "+event.transactionHash)
        })
        } catch (error) {alert(error)};
     
  } 
  } catch {alert("After the error, please refresh the page and fill in the form correctly.")};
  
}else {
    // Show alert if Ethereum provider is not detected
    alert("Please install the MetaMask browser extension.");
  }
} 

  return (
      <div className={styles.container}>
        <Head>
          <title>Crypto Escrow - Release Ether With 1 Click : Yescrow.xyz</title>
          <meta name="description" content="A bankless, fully automated Ethereum escrow for putting money where the mouth is."/>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <form onSubmit={releaseEscrow}>
              <div>
                <h1 className={styles.title}>Release Ether ♦</h1><br/><br/>
                <p>Buyer can release the funds to the seller <b>anytime</b> by submitting the e-mailed ID from the Ethereum address that originally made the escrow.</p>
              </div><br/><br/>
              <div className={styles.form}>
            <label htmlFor="id" className={styles.description}>Escrow ID number</label><br/>
              <input
                type="number" 
                className="form-control" 
                placeholder="#"
                onChange={handleIDChange} />
                <br/>
              <button type="submit">♦ Release</button>
              <br/><code><small>{accounts}</small></code><br/><br/>
              </div>
            </form>
            <Link href='./' fontSize="100px" className="center">Go back</Link><br/>
            <small><p className="col center mt-3">Questions / bug reports - crow@yescrow.xyz</p>
        </small>
      </main>
      <footer className={styles.footer}>
      Putting money where the mouth is since 2023
        </footer>
        </div>
  )
}