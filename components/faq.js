import Link from "next/link"

export default function Faq() {
    return (
        <section class="text-white">
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
                        h-12 w-fill pl-5
                        flex items-center
                    ">
                        <h2 class="text-white">
                            What is Yescrow?
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
                            Yescrow is an Ethereum Virtual Machine compatible escrow agent that allows users to transact with each other without having to trust each other. Yescrow uses smart contracts to ensure that the buyer and seller each fulfill their obligations.                            </p>
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
                                The depositor can release the funds to the payee only using the same wallet which deposited them. The terms of the deal can remain private or shared on-chain.
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
                            h-12 w-fill pl-5
                            flex items-center
                        ">
                            <h2 class="text-white">
                                What are the smart contract escrow fees?
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
                                Yescrow charges a petite 0.5% fee of the token escrowed (NFTs are escrowed for free). Gas fees can range from $0.01 to $10 depending on network congestion and blockchain used (Ethereum is more expensive than Polygon).
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
                            h-12 w-fill pl-5
                            flex items-center
                        ">
                            <h2 class="text-white">
                                How to escrow crypto?
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
                                Negotiate your terms in private. You can share the details of the agreement on-chain if you want. Provide the wallet to which you want to transfer your crypto and deposit the agreed amount in escrow. You can then release the crypto to the payee anytime.
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
                            h-12 w-fill pl-5
                            flex items-center
                        ">
                            <h2 class="text-white">
                                Can I use Yescrow to escrow NFTs?
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
                                Yes, Yescrow smart contract allows to escrow NFTs. The depositor deposits the NFT in escrow and can release it to the wallet of the other party when satisfied.
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
                            h-12 w-fill pl-5
                            flex items-center
                        ">
                            <h2 class="text-white">
                                What if someone does not release the escrow?
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
                                If any side does not uphold their end of the deal, crow@yescrow.io will interfere to make sure that the money goes to the right hands.
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
                            h-12 w-fill pl-5
                            flex items-center
                        ">
                            <h2 class="text-white">
                                Is Yescrow decentralized?
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
                                No, Yescrow is not decentralized, yet. Yescrow is a centralized service that uses smart contracts to ensure that the buyer and seller each fulfill their obligations.
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
                            h-12 w-fill pl-5
                            flex items-center
                        ">
                            <h2 class="text-white">
                                Is Yescrow safe?
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
                                    Absolutely. Our smart contracts have been indepenently audited by  
                                    <Link 
                                        href="https://twitter.com/karooolis"
                                        rel="nofollow"
                                        target="_blank"
                                        class="text-matrix"
                                    > Karolis Ramanauskas
                                    </Link>, who works at 0Xmacro - a leading blockchain security firm. The funds are stored in an encrypted cold wallet.
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
                            h-12 w-fill pl-5
                            flex items-center
                        ">
                            <h2 class="text-white">
                                Is Yescrow open-source?
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
                                Yescrow is open-source, you can find the code on <Link 
                                    href="https://github.com/sunsakis/yescrow"
                                    rel="nofollow"
                                    target="_blank"
                                    class="text-matrix"
                                    >Github</Link>.
                                </p>
                            </div>
                        </div>
            </div>
        </section>
    )
}