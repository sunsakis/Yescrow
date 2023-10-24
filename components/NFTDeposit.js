import Image from "next/image";
import React, { useState } from "react";
import { ethers } from "ethers";
import { Web3Button } from "@thirdweb-dev/react";
import { Interface, FormatTypes } from "@ethersproject/abi";
import styles from "../styles/Home.module.css";

const ESCROW_ABI = [
    "function createDepositERC721(address _seller, address _token, uint256[] calldata _tokenIds) external",
    "event NewDepositERC721(uint256 indexed currentId, address indexed buyer, address indexed seller, address token, uint256[] tokenIds)",
  ];
  
  const ERC721_ABI = [
    "function approve(address to, uint256 tokenId) external"
  ];

  const iface = new Interface(ESCROW_ABI);
  const jsonABI = iface.format(FormatTypes.json);

export default function EscrowForm() {

    const [_tokenIds, setIDValue] = useState("");
    const [_seller, setSellerAddress] = useState("");
    const [_NFTAddress, setNFTAddress] = useState("");

    function handleIDChange(e) {
        setIDValue(e.target.value);
      }
    
      function handleAddressChange(e) {
        setSellerAddress(e.target.value);
      }
    
      function handleNFTAddressChange(e) {
        setNFTAddress(e.target.value);
      }

      async function blockchainTalk() {
        try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          _NFTAddress,
          ERC721_ABI,
          signer
        );
        const approveTx = await contract.approve(
          process.env.NEXT_PUBLIC_MAINNET_ADDRESS,
          ethers.utils.parseUnits(_tokenIds)
        );
        await approveTx.wait();
        const escrowContract = new ethers.Contract(
          process.env.NEXT_PUBLIC_MAINNET_ADDRESS,
          ESCROW_ABI,
          signer
        );
        const escrowTx = await escrowContract.createDepositERC721(
          _seller,
          _NFTAddress,
          _tokenIds
        );
        await escrowTx.wait();
  } catch (error) {
      console.error(error);
      alert(error + " Message escrow@yescrow.io for guidance.");
  }
  }

  async function eventListener () {
    await ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MAINNET_ADDRESS, humanReadableABI, signer);
    alert("Escrow created! Wait for the transaction to be mined. If something: escrow@yescrow.io");
    try {
      contract.once("NewDepositERC721", (counter, buyerAddress, sellerAddress, event) => {
          alert(
            "Buyer address: "+buyerAddress,
            "Seller address: "+sellerAddress,
            "Escrow ID: "+counter,
            "Transaction hash: "+event.transactionHash);   
      })
    } catch (error) {console.log(error)};
  }

  return (
    <div class="m-5">
        <div>
          <label>Receiving Ethereum address:</label>
          <br/>
          <input class="text-center rounded-xl mt-2 mb-2 max-w-xs"
            type="text" 
            placeholder="0x..."
            required
            minLength="42"
            maxLength="42"
            size="50"
            onChange={handleAddressChange} 
          />
          <br/>
          <label>NFT contract address:</label>
          <br/>
          <input class="text-center rounded-xl mt-2 mb-2 max-w-xs"
            type="text" 
            placeholder="0x..."
            required
            minLength="42"
            maxLength="42"
            size="50"
            onChange={handleNFTAddressChange} 
          />
          <br/>
          <label>NFT ID number:</label>
          <br/>
          <div class="text-center">
          <input
            class="rounded-xl mt-2 mb-1 px-32 text-center max-w-xs"
            type="number" 
            placeholder="#" 
            step="any"
            required
            onChange={handleIDChange} 
            />
          </div>
          <br />
          <Web3Button 
                contractAddress={process.env.NEXT_PUBLIC_MAINNET_ADDRESS}
                contractAbi={jsonABI}
                action={() => {
                  blockchainTalk()}}
                onError={() => alert("Make sure to fill out the fields properly and have enough ETH in the wallet. Message crow@yescrow.io for guidance.")}
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