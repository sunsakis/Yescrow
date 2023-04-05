import styles from "../styles/Home.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";

const ESCROW_ABI = [
  "function createDepositERC20(address _seller, address _token, uint256 _amount) external",
  "event NewDepositERC20(uint256 indexed currentId, address indexed buyer, address indexed seller, address token, uint256 amount)",
];

const ERC20_ABI = [
  "function approve(address _spender, uint256 _value) external"
];

export const injected = new InjectedConnector({
  supportedChainIds: [1, 11155111],
});

export default function EscrowForm() {
  const [_tokenAmount, setAmount] = useState("");
  const [_seller, setSellerAddress] = useState("");
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [accounts, setAccounts] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  function handleAddressChange(e) {
    setSellerAddress(e.target.value);
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetaMask(true);
    }
  }, []);

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
      const chainId = await ethereum.request({ method: "eth_chainId" });
      if (chainId !== "0x1") {
        alert("Please select the Ethereum mainnet on your MetaMask.");
      }
      if (chainId == "0x1") {
        try {
          await activate(injected);
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts.length == 0) {
            setAccounts("Connect your Metamask account");
          } else {
            if (isConnected == false) {
              alert(
                "Your Ethereum account " +
                  accounts +
                  " is now connected. You may escrow now."
              );
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
          const ERC20Address = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

          const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_MAINNET_ADDRESS,
            ESCROW_ABI,
            signer
          );

          const ERC20Contract = new ethers.Contract(
            ERC20Address,
            ERC20_ABI,
            signer
          );

          try {
            const approveTx = await ERC20Contract.approve(
              contract.address,
              ethers.utils.parseUnits(_tokenAmount, 6),
              {
                gasLimit: 100000,
              }
            );

            alert("Approving spending of USDT tokens...");
            await approveTx.wait();

            alert("Approved spending of USDT. You can escrow now.");
            const createDepositTx = await contract.createDepositERC20(
              _seller,
              ERC20Address,
              _tokenAmount,
              {
                gasLimit: 300000,
              }
            );
            await createDepositTx.wait();
          } catch (error) {
            console.log(error),
              alert(
                "The transaction failed. Please make sure you approve escrowing the tokens in your Metamask account and try again."
              );
          }

          try {
            contract.on(
              "NewDepositERC20",
              (
                counter,
                buyerAddress,
                sellerAddress,
                tokenAddress,
                _tokenAmount,
                event
              ) => {
                console.log(
                  "Buyer address: " + buyerAddress,
                  "Seller address: " + sellerAddress,
                  "Escrow amount: " + _tokenAmount,
                  "Escrow ID: " + counter,
                  "Token address: " + tokenAddress,
                  "Transaction hash: " + event.transactionHash
                );

                alert(
                  "Appreciate the patience. Your escrow has been created. Save your ID#: " +
                    counter +
                    "."
                );
              }
            );
          } catch (error) {
            console.log(error);
          }
        }
      } catch (e) {
        console.log(e);

        alert(
          "Fix the error and please make sure to fill in the form correctly."
        );
      }
    } else {
      alert("Please install MetaMask browser extension.");
    }
  }

  return (
    <div className={styles.main}>
      <form id="formId" className={styles.form} onSubmit={blockchainTalk}>
        {/* Should alert if user clicks button but is not connected to mainnet */}
        <h1 className={styles.title}>♦ USDT escrow</h1>
        <br />
        <h2>
          Pay with USDT - a stablecoin native to Ethereum, redeemable 1:1 for USD.
        </h2>
        <div className={styles.description}>
          <label>Seller`s Ethereum address</label>
          <br />
          <input
            className={styles.input}
            type="text"
            placeholder="0x..."
            required
            minLength="42"
            maxLength="42"
            onChange={handleAddressChange}
          />
          <br />
          <label>USDT amount</label>
          <br />
          <input
            className={styles.input}
            type="number"
            placeholder="$"
            step="any"
            onChange={handleAmountChange}
            required
          />
                <br />
                <code>0.5% fee + gas</code>
                <br /><br />
          <button type="submit">♦ Escrow</button>
        </div>
      </form>
      <h3>
        Show the seller your transaction hash to prove you have deposited.<br />
        <br />
        Then let them do their part.
      </h3><br/>
      <h4>
      <Link href="/usdt/escrow">
      Release the escrow
      </Link> 
      {" "}when you are happy.</h4><br/>
      <p>It`s that simple.</p>
      <br />
      <br />
      <br />
      <div>
        <code>{accounts}</code>
      </div>
    </div>
  );
}
