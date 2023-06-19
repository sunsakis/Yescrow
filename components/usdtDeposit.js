import Image from "next/image";
import React, { useState } from "react";
import { ethers } from "ethers";
import { Web3Button } from '@thirdweb-dev/react';
import { Interface, FormatTypes } from "@ethersproject/abi";
import styles from "../styles/Home.module.css";

const humanReadableABI = [
  "function createDepositERC20(address _seller, address _token, uint256 _amount) external",
  "event NewDepositERC20(uint256 indexed currentId, address indexed buyer, address indexed seller, address token, uint256 amount)",
];

const humanReadableERC20_ABI = [
  "function approve(address _spender, uint256 _value) external"
];

const ERC20Address = "0xdac17f958d2ee523a2206206994597c13d831ec7";

const iface = new Interface(humanReadableABI);
const jsonABI = iface.format(FormatTypes.json);

export default function EscrowForm() {
  const [_tokenAmount, setAmount] = useState("");
  const [_seller, setSellerAddress] = useState("");

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  function handleAddressChange(e) {
    setSellerAddress(e.target.value);
  }

  async function blockchainTalk() {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      ERC20Address,
      humanReadableERC20_ABI,
      signer
    );
    const approveTx = await contract.approve(
      process.env.NEXT_PUBLIC_MAINNET_ADDRESS,
      ethers.utils.parseUnits(_tokenAmount, 6)
    );
    await approveTx.wait();
    const escrowContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_MAINNET_ADDRESS,
      humanReadableABI,
      signer
    );
    const escrowTx = await escrowContract.createDepositERC20(
      _seller,
      ERC20Address,
      ethers.utils.parseUnits(_tokenAmount, 6)
    );
    await escrowTx.wait();
    alert("Escrow created!");
    } catch (e) {
      console.log(e);
    }
  }

  async function eventListener () {
    await ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MAINNET_ADDRESS, humanReadableABI, signer);
    alert("Escrow created! Wait for the transaction to be mined. You are one of our first customers and will receive an airdrop.");
    try {
      contract.once("NewDepositERC20", (counter, buyerAddress, sellerAddress, depositAmount, event) => {
          alert(
            "Buyer address: "+buyerAddress,
            "Seller address: "+sellerAddress,
            "Escrow amount: "+JSON.stringify(depositAmount.toString()),
            "Escrow ID: "+counter,
            "Transaction hash: "+event.transactionHash);   
      })
    } catch (error) {console.log(error)};
  }


  return (
    <div class="m-5">
        <div>
          <label>Stranger`s Ethereum address:</label>
          <br/>
          <input class="text-center rounded-xl mt-2 max-w-xs sm:max-w-md"
            type="text" 
            placeholder="0x..."
            required
            minLength="42"
            maxLength="42"
            size="50"
            onChange={handleAddressChange} 
          />
          <br/>
          <br />
          <label>USDT amount:</label>
          <br/>
          <div class="text-center">
          <input
            class="rounded-xl mt-2 mb-2 text-center max-w-xs sm:max-w-md"
            type="number" 
            placeholder="$0.00" 
            step="any"
            required
            onChange={handleAmountChange} 
            />
          </div>
          <br />
                <Web3Button 
                contractAddress={process.env.NEXT_PUBLIC_MAINNET_ADDRESS}
                contractAbi={jsonABI}
                action={() => {
                  blockchainTalk()}}
                onError={() => alert("Make sure to fill out the fields properly and have enough ETH and USDT in the wallet. Message escrow@yescrow.io for guidance.")}
                onSuccess={() => eventListener()}
                className={styles.btn}
                >
                <li class="flex items-center">
                <Image
                  src="/lock_icon.png" 
                  class="fill-current h-6 w-6 mr-1" 
                  width="48" 
                  height="48" 
                  alt="lock icon">
                </Image> Escrow</li>
                </Web3Button>
        </div>
  </div>
  );
}
