import React, { useState } from 'react';
import { ethers } from "ethers";
import Image from 'next/image';
import { Web3Button } from '@thirdweb-dev/react';
import { Interface, FormatTypes } from 'ethers/lib/utils';
import styles from '../styles/Home.module.css';
import Router from 'next/router';


const humanReadableABI = [
  "function createDepositETH(address _receiver) external payable",
  "function createDepositERC20(address _receiver, address _token, uint256 _amount) external",
  "function releaseDeposit(uint256 _id) external",
  "event NewDepositETH(uint256 indexed depositId, address indexed depositor, address indexed receiver, uint256 amount)",
  "event NewDepositERC20(uint256 indexed depositId, address indexed depositor, address indexed receiver, address token, uint256 amount)",
  "event DepositReleased(uint256 indexed id)"
  ];

  const iface = new Interface(humanReadableABI);
  const jsonABI = iface.format(FormatTypes.json);

export default function EthEscrowForm() {

  const [_amount, setDepositValue] = useState('')
  const [_seller, setSellerAddress] = useState('')

  function handleDepositChange(e) {
    setDepositValue(e.target.value);
  }

  function handleAddressChange(e) {
    setSellerAddress(e.target.value);
  }

  return (
          <div class="m-5">
              <div>
                <label>Stranger`s Ethereum address:</label>
                <br/>
                <input class="text-center rounded-xl mt-2 mb-2 max-w-xs sm:max-w-md"
                  type="text" 
                  placeholder="0x..."
                  required
                  minLength="42"
                  maxLength="42"
                  size="50"
                  onChange={handleAddressChange} 
                />
                <br/>
                <label>ETH amount:</label>
                <br/>
                <div class="text-center">
                <input
                  class="rounded-xl mt-2 mb-2 text-center max-w-xs sm:max-w-md"
                  type="number" 
                  placeholder="Ξ0.00" 
                  step="any"
                  required
                  onChange={handleDepositChange} 
                  />
                </div>
                <br />
                <Web3Button 
                contractAddress={process.env.NEXT_PUBLIC_MAINNET}
                contractAbi={jsonABI}
                action={async (contract) => { await contract.call("createDepositETH", [_seller], { value: ethers.utils.parseEther(_amount) })}}
                onError={() => alert("Make sure to fill out the fields properly and have enough ETH in the wallet. Message escrow@yescrow.io for guidance.")}
                onSuccess={() => Router.reload(window.location.pathname)}
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
