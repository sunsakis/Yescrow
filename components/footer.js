import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer class="text-center m-5">
            <div>
                <p class="flex justify-center text-gray-500 text-xs">
                    <code class="text-gray-500 text-xs">
                        2023 © Yescrow. All Rights Reserved. 
                        <span class="text-white"> crow@yescrow.io</span>
                    </code>
                </p>
                <div class="flex justify-center m-3">
                    <Link 
                        href="https://t.me/sunsakis"
                        rel="nofollow"
                        target="_blank"
                        >
                            <Image src=
                            "/telegram.png" 
                            class=" h-7 w-7" 
                            width="54" 
                            height="54" 
                            viewBox="0 0 54 54" 
                            xmlns="http://www.w3.org/2000/svg" 
                            alt="Telegram logo" 
                            />
                    </Link>
                    <Link 
                        href="https://twitter.com/yescrowio"
                        rel="nofollow"
                        target="_blank"
                        >
                            <Image src=
                            "/twitter.png"
                            class=" h-7 w-7 ml-2"
                            width="54"
                            height="54"
                            viewBox="0 0 54 54"
                            xmlns="http://www.w3.org/2000/svg"
                            alt="Twitter logo" />
                    </Link>
                    </div>
            </div>
        </footer>

    )
}