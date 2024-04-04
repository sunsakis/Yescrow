import React, { useState } from 'react';
import EthEscrowForm from './ethDeposit';
import UsdtEscrowForm from './usdtDeposit';
import USDCEscrowForm from './usdcDeposit';
import Image from 'next/image';

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

  return (
    <div 
    class="rounded-3xl pt-3 pb-2 text-center border-2 bg-[#161618]"
    id="Escrow">
        <p class="font-bold text-xl">Which cryptocurrency would you like to escrow?</p>
        <br />
        <div>
          <ul>
            <button id="ETH" class={`${borderEth} m-3 border-matrix bg-[#3B3B3B] rounded-xl py-3 px-3 font-bold hover:text-green-500 hover:border-green-500`} onClick={() => setActive("ETH")}>
              <li class="flex items-center">
                <Image
                  src="/ethereum.svg" 
                  class="fill-current h-6 w-6 mr-1" 
                  width="48" 
                  height="48" 
                  alt="Ethereum">
                </Image> Ether
              </li></button>
            <button
              id="USDT" 
              class={`${borderUsdt} m-3 border-matrix bg-[#3B3B3B] rounded-xl py-3 px-3 font-bold hover:text-green-500 hover:border-green-500`} 
              onClick={() => setActive("USDT")}>
              <li class="flex items-center">
                <Image
                  src="/usdt.svg" 
                  class="fill-current h-6 w-6 mr-1" 
                  width="48" 
                  height="48" 
                  alt="USDT">
                </Image> USDT</li></button>
            <button
              id="USDC" 
              class={`${borderUsdc} m-3 border-matrix bg-[#3B3B3B] rounded-xl py-3 px-3 font-bold hover:text-green-500 hover:border-green-500`} 
              onClick={() => setActive("USDC")}>
              <li class="flex items-center">
                <Image
                  src="/usdc.svg" 
                  class="fill-current h-6 w-6 mr-1" 
                  width="48" 
                  height="48" 
                  alt="USDC">
                </Image> USDC</li></button>
          </ul>
        </div>
      <div>
        {active === "ETH" && <EthEscrowForm />}
        {active === "USDT" && <UsdtEscrowForm />}
        {active === "USDC" && <USDCEscrowForm />}
      </div>   
    </div>    
  )
}
