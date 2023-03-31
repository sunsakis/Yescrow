import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";

const ESCROW_ABI = [
  "function createDepositERC20(address _seller, address _token, uint256 _amount) external",
  "event NewDepositERC20(uint256 indexed currentId, address indexed buyer, address indexed seller, address token, uint256 amount)",
];

const ERC20_ABI = [
  "function safeIncreaseAllowance(contract IERC20 token, address spender, uint256 value)"
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
          } else { if (isConnected == false) {
            alert("Your Ethereum account "+accounts+" is now connected. You may escrow now.")
            setIsConnected(true) }}
        } catch (e) {
          console.log(e);
        }
      }
      try {
        if (active) {
          const signer = provider.getSigner();
          
          wbtcAddress = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"

          const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_SEPOLIA_ADDRESS,
            ESCROW_ABI,
            signer
          );

          const WBTCContract = new ethers.Contract(
            wbtcAddress,
            ERC20_ABI,
            signer
          );

          try { 
              const approveTx = await WBTCContract.safeIncreaseAllowance(wbtcAddress, contract.address, _tokenAmount, {
                gasLimit: 100000,
              });
              alert("Approving escrow of WBTC tokens...")
              await approveTx.wait()
              alert("Approved escrow of WBTC. You can escrow now.");
            
            const createDepositTx =  await contract.createDepositERC20(_seller, wbtcAddress, _tokenAmount, {
              gasLimit: 300000,
            });
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
                    "Appreciate the patience. Your escrow has been created. Save your ID#: " +counter+ "." 
                  );
              }
            );
          } catch (error) {
            console.log(error);
          }
        }
      } catch {
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
        <h1 className={styles.title}>♦ Ethereum escrow for WBTC</h1>
        <br />
        <p>
          WBTC is a bitcoin token wrapped around the Ethereum blockchain. 
          It is a workaround for escrowing bitcoin on Ethereum`s smart contract system.
          If you want to escrow actual bitcoin, please use the Bitcoin escrow form.
        </p>
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
          <br />
          <label>WBTC amount</label>
          <br />
          <input
            className={styles.input}
            type="number"
            placeholder="₿"
            step="any"
            onChange={handleAmountChange}
            required
          />
          <br />
          <br />
          <button type="submit">♦ Escrow</button>
        </div>
      </form>
      <h2>Show the seller proof that you have deposited to the escrow in one click. <br/><br/>Then let them do their part.</h2><br/><br/><br/>
      <div>
        <code>{accounts}</code>
      </div>
    </div>
  );
}
