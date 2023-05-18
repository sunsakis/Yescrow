import { ethers } from "ethers";
import Link from "next/link";
import React, { useState, useEffect } from 'react';

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
      alert("Please select the Ethereum mainnet on your MetaMask.");
    }
    if (chainId == '0x1') {try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length == 0) { setAccounts("Connect your Metamask account") } else
        setAccounts("Your Ethereum account "+accounts+" is connected.")
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
        contract.on("DepositReleased", (counter) => {
          provider.once("block", () => {
          console.log(
            "ID: " + counter
            )
          });
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
          <form onSubmit={releaseEscrow}>
                <h1>Release Ether <span>♦</span></h1><br/><br/>
                <h2>A depositor can release the escrow <b>anytime</b> by submitting the ID using the original Ethereum address.</h2>
              <br/><br/>
              <div>
            <label>Escrow ID number</label><br/>
              <input
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
            <small><p className="col center mt-3">Questions / bug reports - crow@yescrow.io</p>
        </small>
    </div>
        
  )
}