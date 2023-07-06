import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer class="text-center m-5">
            <div>
                <p class="flex justify-center text-gray-500 text-xs">
                    <code class="text-gray-500 text-xs">
                        2023 © yescrow. <span class="text-gray-300">Safety first.</span> 
                        <span class="text-white"> escrow@yescrow.io</span>
                    </code>
                </p>
                <div class="flex justify-center m-3">
                <Link 
                        href="https://github.com/sunsakis/Yescrow"
                        rel="nofollow"
                        target="_blank"
                        >
                            <Image src=
                            "/github.png"
                            class=" h-5 w-5 mr-2 rounded-xl bg-white hover:opacity-50"
                            width="54"
                            height="54"
                            viewBox="0 0 54 54"
                            xmlns="http://www.w3.org/2000/svg"
                            alt="GitHub logo" />
                    </Link>
                    <Link 
                        href="https://twitter.com/theyescrow"
                        rel="nofollow"
                        target="_blank"
                        >
                            <Image src=
                            "/twitter-icon-white-22.png"
                            class=" h-5 w-6 ml-2 rounded-xl hover:opacity-50"
                            width="54"
                            height="54"
                            viewBox="0 0 54 54"
                            xmlns="http://www.w3.org/2000/svg"
                            alt="GitHub logo" />
                    </Link>
                    </div>
            </div>
        </footer>

    )
}