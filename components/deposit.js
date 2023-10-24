import React, { useState } from 'react';
import EthEscrowForm from './ethDeposit';
import UsdtEscrowForm from './usdtDeposit';
import Image from 'next/image';

export default function EscrowForm() {

  const [active, setActive] = useState("USDT");

  if (active === "ETH") {
    var borderEth = "border text-matrix"
  }

  if (active === "USDT") {
    var borderUsdt = "border text-matrix"
  }

  return (
    <div 
    class="rounded-3xl pt-3 pb-2 text-center border-2 bg-[#161618]"
    id="EscrowUSDT">
        <p class="font-bold text-xl">Which token would you like to escrow?</p>
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
                  alt="Ethereum">
                </Image> Ether
              </li></button>
            <button
              id="Deposit" 
              class={`${borderUsdt} m-3 border-matrix bg-[#3B3B3B] rounded-xl py-3 px-3 font-bold hover:text-green-500 hover:border-green-500`} 
              onClick={() => setActive("USDT")}>
              <li class="flex items-center">
                <Image
                  src="/tether-usdt-logo.svg" 
                  class="fill-current h-6 w-6 mr-1" 
                  width="48" 
                  height="48" 
                  alt="USDT">
                </Image> USDT</li></button>
          </ul>
        </div>
      <div>
        {active === "ETH" && <EthEscrowForm />}
        {active === "USDT" && <UsdtEscrowForm />}
      </div>   
    </div>    
  )
}
