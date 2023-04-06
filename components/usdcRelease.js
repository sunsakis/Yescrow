import { ethers } from "ethers";
import Link from "next/link";
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import { injected } from "./ethEscrowForm";

const ABI = [
  "function releaseDeposit(uint256 _id) external",
  "event DepositReleased(uint256 indexed id)"
];

export default function ReleaseForm() {

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
    const chainId = await window.ethereum.request({ method: 'eth_chainId'});
    // Check if user is connected to Mainnet
    if(chainId !== '0x1') {
      console.log(chainId)
      alert("Please select the Ethereum mainnet on your MetaMask.");
    }
    if (chainId == '0x1') {try {
        await activate(injected);
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length == 0) { setAccounts("Connect your Metamask account") } else
        setAccounts("Your Ethereum account "+accounts+" is now connected. You may escrow now.")
      } catch (e) {
        console.log(e);
      }
      }
      try {
        if (active) {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MAINNET_ADDRESS, ABI, signer);
        try { await contract.releaseDeposit(_id, {gasLimit: 250000}) }
        catch (error) {alert("Type in the correct ID or your transaction will be rejected.")};
        
        try{
          contract.on("DepositReleased", (id, event) => {
            alert("Escrow #" + id + " has been released.");
          })
        } catch (error) {alert(error)};
     
  } 
  } catch {alert("Fix the error and please make sure to fill in the form correctly.")};
  
}else {
    // Show alert if Ethereum provider is not detected
    alert("Please install the MetaMask browser extension.");
  }
} 

  return (
    <div>
          <form className={styles.form} onSubmit={releaseEscrow}>
                <h1 className={styles.title}>Release USDC <span className={styles.symbol}>♦</span></h1><br/><br/>
                <h2>A depositor can release the escrow <b>anytime</b> by submitting the ID using the original Ethereum address.</h2>
              <br/><br/>
              <div className={styles.form}>
            <label htmlFor="id" className={styles.description}>Escrow ID number</label><br/>
              <input className={styles.input}
                type="number" 
                placeholder="#"
                required
                onChange={handleIDChange} />
                <br/><br/>
              <button type="submit">♦ Release</button>
              <br/><code><small>{accounts}</small></code><br/><br/>
              </div>
            </form>
            <Link href='./' fontSize="100px" className="center">Go back</Link><br/><br/><br/>
            <small><p className="col center mt-3">Questions / bug reports - crow@yescrow.xyz</p>
        </small>
    </div>
        
  )
}