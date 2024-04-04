import Link from "next/link";

export default function Footer() {
    return (
        <footer class="text-center m-5">
            <div>
                    <p class="flex justify-center text-gray-200 text-sm mb-2"> 
                        <Link href="/usdc" class="underline hover:text-matrix px-1">USDC</Link> | 
                        <Link href="/usdt" class="underline hover:text-matrix px-1">USDT</Link> | 
                        <Link href="/eth" class="underline hover:text-matrix px-1">ETH</Link> | 
                        <Link href="/nft" class="underline hover:text-matrix px-1">NFT</Link> | 
                        <Link href="/tips" class="underline hover:text-matrix px-1">Tips</Link> 
                    </p>
                <p class="flex justify-center text-gray-500 text-xs">
                    <code class="text-gray-500 text-xs">
                        2024 © Yescrow. 
                        {/* <span class="text-gray-300">For sale.</span>  */}
                        <span class="text-white"> sunsakis@pm.me</span>
                    </code>
                </p>
            </div>
        </footer>

    )
}