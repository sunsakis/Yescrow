import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

const ABI = [
  "function createDepositETH(address _seller) external payable",
  "event NewDepositETH(uint256 indexed currentId, address indexed buyer, address indexed seller, uint256 amount)"
  ];

export const injected = new InjectedConnector({ supportedChainIds: [1, 11155111] });

export default function Request() {

    const [submitted, setSubmit] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [hasMetaMask, setHasMetaMask] = useState(false);
    const [amount, setAmount] = useState('')
    const [payer, setPayerAddress] = useState('')
    const [accounts, setAccounts] = useState('');
    const [message, setMessage] = useState('');
    const [buttonText, setButtonText] = useState('♦ Connect');

    function handleAmountChange(e) {
        setAmount(e.target.value);
    }

    function handleRequestTargetChange(e) {
        setPayerAddress(e.target.value);
    }

    function handleMessageChange(e) {
        setMessage(e.target.value);
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
            setAccounts("Your Ethereum account "+accounts+" is connected. You may request an escrow now.");
            setButtonText('♦ Request');  
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
        try { console.log("Sending email to "+payer+" with message: "+message)

        let data = {
            amount,
            message,
            payer,
            accounts
        }
    
        fetch('/api/sendgrid', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then((res) => {
            console.log('Response received')
            if (res.status === 200) {
              console.log('Response succeeded!')
              setSubmit(true)
              setAmount(amount)
              setPayerAddress(payer)
              setMessage(message)
            }
          })
        } 
        catch (error) {console.log(error)}
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
                <h2 className={styles.title}><span className={styles.symbol}>♦</span> Request A Deposit</h2>
              <br/>
              <h3> Use this form to request a payment be put in escrow.</h3><br/>
              <p>
            Request using MetaMask with the address you want to receive the pay in.<br />
        <br />
        This way you don`t have to bother solving captchas.
      </p><br/>
      <p>Easy.</p>
              <div className={styles.description}>
                <label htmlFor="target">Payer`s email</label><br/>
                <input className={styles.input}
                  type="text" 
                  placeholder="onewho@needsto.pay" 
                  required
                  onChange={handleRequestTargetChange}
                /><br/>
                <label htmlFor="amount">Payment size</label><br/>
                <input className={styles.input}
                  type="text" 
                  placeholder="BTC, ETH or any ERC20"
                  required
                  onChange={handleAmountChange} 
                  />
                <br />
                <label htmlFor="message">Message</label><br/>
                <textarea className={styles.input}
                    type="text"
                    placeholder="Message to the payer (optional)"
                    rows="4"
                    cols="30"
                    onChange={handleMessageChange}
                    />
                <br /><br/>
                <button type="submit">{buttonText}</button>
                <br/><code><small>{accounts}</small></code><br/><br/>
              </div>
            </form>
      <br />
      <br />
        </div>
  )
}
