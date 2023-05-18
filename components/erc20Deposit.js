import Image from "next/image";
import React, { useState } from "react";
import { ethers } from "ethers";
import { Web3Button } from "@thirdweb-dev/react";
import { Interface, FormatTypes } from "@ethersproject/abi";

const humanReadableABI = [
  "function createDepositERC20(address _seller, address _token, uint256 _amount) external",
  "event NewDepositERC20(uint256 indexed currentId, address indexed buyer, address indexed seller, address token, uint256 amount)",
];

const humanReadableERC20_ABI = [
  "function approve(address _spender, uint256 _value) external"
];

const iface = new Interface(humanReadableABI);
const jsonABI = iface.format(FormatTypes.json);

export default function EscrowForm() {
  const [_tokenAmount, setAmount] = useState("");
  const [_seller, setSellerAddress] = useState("");
  const [_tokenAddress, setTokenAddress] = useState("");

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  function handleAddressChange(e) {
    setSellerAddress(e.target.value);
  }

  function handleTokenAddressChange(e) {
    setTokenAddress(e.target.value);
  }

  async function blockchainTalk() {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      _tokenAddress,
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
      _tokenAddress,
      ethers.utils.parseUnits(_tokenAmount, 6)
    );
    await escrowTx.wait();
    alert("Escrow created!");
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <div class="m-5">
        <div>
          <label>Stranger`s Ethereum address:</label>
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
          <label>ERC20 contract address:</label>
          <br/>
          <input class="text-center rounded-xl mt-2 mb-2 max-w-xs"
            type="text" 
            placeholder="0x..."
            required
            minLength="42"
            maxLength="42"
            size="50"
            onChange={handleTokenAddressChange} 
          />
          <br/>
          <label>Escrow amount:</label>
          <br/>
          <div class="text-center">
          <input
            class="rounded-xl mt-2 mb-1 px-32 text-center max-w-xs"
            type="number" 
            placeholder="0.00" 
            step="any"
            required
            onChange={handleAmountChange} 
            />
            <br/>
            <code class="text-xs text-center">0.5% fee + gas</code>
          </div>
          <br />
          <Web3Button 
                contractAddress={process.env.NEXT_PUBLIC_MAINNET_ADDRESS}
                contractAbi={jsonABI}
                action={() => {
                  blockchainTalk()}}
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
