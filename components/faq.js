import Link from "next/link"

export default function Faq() {
    return (
        <section class="text-white" id="FAQ">
            <div class="relative overflow-hidden m-3">
                <input 
                    type="checkbox" 
                    class="
                        peer
                        absolute top-0 inset-x-0
                        w-full h-12
                        opacity-0 z-10 cursor-pointer
                        "
                />
                    <div class="
                        rounded-xl peer-checked:rounded-b-none
                        peer-checked:bg-matrix
                        bg-[#161618]
                        h-12 w-fill pl-5
                        flex items-center
                    ">
                        <h2 class="text-white">
                            What is a crypto escrow?
                        </h2>
                    </div>
                    <div class="
                        absolute top-3 right-3
                        text-white
                        transition-transform duration-500
                        rotate-0 peer-checked:rotate-180
                        ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                    <div class="
                    rounded-b-xl
                    bg-[#161618]
                    overflow-hidden
                    transition-all duration-500
                    max-h-0 peer-checked:max-h-80
                    p-0 peer-checked:p-2
                    ">
                        <div class="p-4 text-gray-400">
                            <p>
                            Yes Crow is an Ethereum escrow agent that allows users to transact with each other without having to trust each other.</p>
                        </div>
                    </div>
            </div>
            <div class="relative overflow-hidden m-3">
                    <input 
                        type="checkbox" 
                        class="
                            peer
                            absolute top-0 inset-x-0
                            w-full h-12
                            opacity-0 z-10 cursor-pointer
                            "
                    />
                        <div class="
                            rounded-xl peer-checked:rounded-b-none
                            bg-[#161618]
                            peer-checked:bg-matrix
                            h-12 w-fill pl-5
                            flex items-center
                        ">
                            <h2 class="text-white">
                                What cryptocurrencies does Yes Crow support?
                            </h2>
                        </div>
                        <div class="
                            absolute top-3 right-3
                            text-red
                            transition-transform duration-500
                            rotate-0 peer-checked:rotate-180
                            ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                        <div class="
                        rounded-b-xl
                        bg-[#161618]
                        overflow-hidden
                        transition-all duration-500
                        max-h-0 peer-checked:max-h-80
                        p-0 peer-checked:p-2
                        ">
                            <div class="p-4  text-gray-400">
                                <p>
                                Yes Crow supports Ethereum and all the other <Link href="yescrow.io/erc20">ERC20 tokens</Link> such as <Link href="yescrow.io/usdt">USDT</Link>, <Link href="yescrow.io/usdc">USDC</Link>, DAI, LINK, UNI, etc. 
                                </p>
                            </div>
                        </div>
            </div>
            <div class="relative overflow-hidden m-3">
                    <input 
                        type="checkbox" 
                        class="
                            peer
                            absolute top-0 inset-x-0
                            w-full h-12
                            opacity-0 z-10 cursor-pointer
                            "
                    />
                        <div class="
                            rounded-xl peer-checked:rounded-b-none
                            bg-[#161618]
                            peer-checked:bg-matrix
                            h-12 w-fill pl-5
                            flex items-center
                        ">
                            <h2 class="text-white">
                                How does a crypto escrow work?
                            </h2>
                        </div>
                        <div class="
                            absolute top-3 right-3
                            text-red
                            transition-transform duration-500
                            rotate-0 peer-checked:rotate-180
                            ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                        <div class="
                        rounded-b-xl
                        bg-[#161618]
                        overflow-hidden
                        transition-all duration-500
                        max-h-0 peer-checked:max-h-80
                        p-0 peer-checked:p-2
                        ">
                            <div class="p-4  text-gray-400">
                                <p>
                                By sending a cryptocurrency with the receiver`s address to the smart contract. You can release the deposit to the receiver as soon as you get what you wanted. 
                                </p>
                            </div>
                        </div>
            </div>
            <div class="relative overflow-hidden m-3">
                    <input 
                        type="checkbox" 
                        class="
                            peer
                            absolute top-0 inset-x-0
                            w-full h-12
                            opacity-0 z-10 cursor-pointer
                            "
                    />
                        <div class="
                            rounded-xl peer-checked:rounded-b-none
                            bg-[#161618]
                            peer-checked:bg-matrix
                            h-12 w-fill pl-5
                            flex items-center
                        ">
                            <h2 class="text-white">
                                How much does it cost to escrow? 
                            </h2>
                        </div>
                        <div class="
                            absolute top-3 right-3
                            text-red
                            transition-transform duration-500
                            rotate-0 peer-checked:rotate-180
                            ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                        <div class="
                        rounded-b-xl
                        bg-[#161618]
                        overflow-hidden
                        transition-all duration-500
                        max-h-0 peer-checked:max-h-80
                        p-0 peer-checked:p-2
                        ">
                            <div class="p-4  text-gray-400">
                                <p>
                                Yes crow charges 0.5% per escrow. In case of a dispute, Yes Crow can act as an arbitre for a 1% fee. 
                                </p>
                            </div>
                        </div>
            </div>
            <div class="relative overflow-hidden m-3">
                    <input 
                        type="checkbox" 
                        class="
                            peer
                            absolute top-0 inset-x-0
                            w-full h-12
                            opacity-0 z-10 cursor-pointer
                            "
                    />
                        <div class="
                            rounded-xl peer-checked:rounded-b-none
                            bg-[#161618]
                            peer-checked:bg-matrix
                            h-12 w-fill pl-5
                            flex items-center
                        ">
                            <h2 class="text-white">
                            What if the depositor does not release the funds?
                            </h2>
                        </div>
                        <div class="
                            absolute top-3 right-3
                            text-red
                            transition-transform duration-500
                            rotate-0 peer-checked:rotate-180
                            ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                        <div class="
                        rounded-b-xl
                        bg-[#161618]
                        overflow-hidden
                        transition-all duration-500
                        max-h-0 peer-checked:max-h-80
                        p-0 peer-checked:p-2
                        ">
                            <div class="p-4  text-gray-400">
                                <p>
                                If the designated receiver does not contact us within 90 days to claim the funds, the depositor is then allowed to withdraw them. 
                                </p>
                            </div>
                        </div>
            </div>
            <div class="relative overflow-hidden m-3">
                    <input 
                        type="checkbox" 
                        class="
                            peer
                            absolute top-0 inset-x-0
                            w-full h-12
                            opacity-0 z-10 cursor-pointer
                            "
                    />
                        <div class="
                            rounded-xl peer-checked:rounded-b-none
                            bg-[#161618]
                            peer-checked:bg-matrix
                            h-12 w-fill pl-5
                            flex items-center
                        ">
                            <h2 class="text-white">
                                How can I know that I can trust Yes Crow, though?
                            </h2>
                        </div>
                        <div class="
                            absolute top-3 right-3
                            text-red
                            transition-transform duration-500
                            rotate-0 peer-checked:rotate-180
                            ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                        <div class="
                        rounded-b-xl
                        bg-[#161618]
                        overflow-hidden
                        transition-all duration-500
                        max-h-0 peer-checked:max-h-80
                        p-0 peer-checked:p-2
                        ">
                            <div class="p-4  text-gray-400">
                                <p>
                                    The smart contract is 
                                    <Link 
                                        href="https://etherscan.io/address/0x450082ADE010fE62EB12c08350f0bA3CE55f46eF"
                                        rel="nofollow"
                                        target="_blank"
                                        class="text-matrix"
                                    > public</Link>. Audited by
                                    <Link 
                                        href="https://twitter.com/karooolis"
                                        rel="nofollow"
                                        target="_blank"
                                        class="text-matrix"
                                    > @karooolis
                                    </Link> from  
                                    <Link 
                                        href="https://0xmacro.com"
                                        rel="nofollow"
                                        target="_blank"
                                        class="text-matrix"> Macro
                                    </Link> - a leading blockchain security firm. Emails are encrypted, data is stored in Western Europe.
                                </p>
                            </div>
                        </div>
            </div>
        </section>
    )
}