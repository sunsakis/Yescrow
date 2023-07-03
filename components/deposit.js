import React, { useState } from 'react';
import EthEscrowForm from './ethDeposit';
import UsdtEscrowForm from './usdtDeposit';
import UsdcEscrowForm from './usdcDeposit';
import Erc20EscrowForm from './erc20Deposit';
import Image from 'next/image';

const ABI = [
  "function createDepositETH(address _seller) external payable",
  "event NewDepositETH(uint256 indexed currentId, address indexed buyer, address indexed seller, uint256 amount)"
  ];

export default function EscrowForm() {

  const [active, setActive] = useState("ETH");

  if (active === "ETH") {
    var borderEth = "border text-matrix"
  }

  if (active === "USDT") {
    var borderUsdt = "border text-matrix"
  }

  if (active === "USDC") {
    var borderUsdc = "border text-matrix"
  }

  if (active === "ERC20") {
    var borderErc20 = "border text-matrix"
  }

  return (
    <div class="rounded-3xl pt-3 pb-2 text-center bg-[#161618]">
        <h2 class="font-bold text-xl">Which Ethereum token would you like to escrow?</h2>
        <br />
        <div>
          <ul>
            <button class={`${borderEth} m-3 border-matrix bg-[#3B3B3B] rounded-xl py-3 px-3 font-bold hover:text-green-500 hover:border-green-500`} onClick={() => setActive("ETH")}>
              <li class="flex items-center">
                <Image
                  src="/ethereum.svg" 
                  class="fill-current h-6 w-6 mr-1" 
                  width="48" 
                  height="48" 
                  alt="Ethereum logo">
                </Image> Ether
              </li></button>
            <button 
              class={`${borderUsdt} m-3 border-matrix bg-[#3B3B3B] rounded-xl py-3 px-3 font-bold hover:text-green-500 hover:border-green-500`} 
              onClick={() => setActive("USDT")}>
              <li class="flex items-center">
                <Image
                  src="/tether-usdt-logo.svg" 
                  class="fill-current h-6 w-6 mr-1" 
                  width="48" 
                  height="48" 
                  alt="Tether logo">
                </Image> USDT</li></button>
            <button 
              class={`${borderUsdc} m-3 border-matrix bg-[#3B3B3B] rounded-xl py-3 px-3 font-bold hover:text-green-500 hover:border-green-500`} 
              onClick={() => setActive("USDC")}>
                <li class="flex items-center">
                <Image
                  src="/usd-coin-usdc-logo.svg" 
                  class="fill-current h-6 w-6 mr-1" 
                  width="48" 
                  height="48" 
                  alt="USDC logo">
                </Image> USDC</li></button>
            <button 
              class={`${borderErc20} m-3 border-matrix bg-[#3B3B3B] rounded-xl py-3 px-3 font-bold hover:text-green-500 hover:border-green-500`} 
              onClick={() => setActive("ERC20")}>
                <li class="flex items-center">
                <Image
                  src="/ethereum.svg" 
                  class="fill-current h-6 w-6 mr-1" 
                  width="48" 
                  height="48" 
                  alt="Ethereum logo">
                </Image> ERC20</li></button>
          </ul>
        </div>
      <div>
        {active === "ETH" && <EthEscrowForm />}
        {active === "USDT" && <UsdtEscrowForm />}
        {active === "USDC" && <UsdcEscrowForm />}
        {active === "ERC20" && <Erc20EscrowForm />}
      </div>   
    </div>    
  )
}
