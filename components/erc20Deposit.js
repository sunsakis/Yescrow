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
  const [_tokenAddress, setTokenAddress] = useState("");

  function handleTokenAddressChange(e) {
    setTokenAddress(e.target.value);
  }

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
          const ERC20Address = _tokenAddress;

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

            alert("Approving spending of ERC20 tokens...");
            await approveTx.wait();

            alert("Approved spending of tokens. You can escrow now.");
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
    <div>
      <form id="formId" className={styles.form} onSubmit={blockchainTalk}>
        {/* Should alert if user clicks button but is not connected to mainnet */}
        <h1 className={styles.title}><span className={styles.symbol}>♦</span> Escrow ERC20</h1>
        <br />
        <h2>
          Pay with any ERC20 token - Ethereum`s fungible token standard. 
        </h2>
        <div className={styles.description}>
          <label>Receiver`s Ethereum address</label>
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
          <label>ERC20 token contract</label>
          <br />
          <input
            className={styles.input}
            type="text"
            placeholder="0x..."
            minLength="42"
            maxLength="42"
            onChange={handleTokenAddressChange}
            required
          />
          <br />
          <label>Escrow amount</label>
          <br />
          <input
            className={styles.input}
            type="number"
            placeholder="1..."
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
      Share your transaction hash to prove you have escrowed the funds.<br />
        <br />
        Then let the other party do their part.
      </h3><br/>
      <h4>
      <Link href="/erc20/escrow">
      Release the escrow
      </Link> 
      {" "}when you are happy.</h4><br/>
      <p>It`s that simple.</p>
      <br />
      <br />
    </div>
  );
}
