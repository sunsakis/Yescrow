import Link from 'next/link';
import Image from 'next/image';
import { ConnectWallet } from '@thirdweb-dev/react';

export default function Header() {
    return (
      <nav class="flex items-center justify-between p-6">
        <Link href="/">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
      <Image
        src="/white_vector_crow.svg" 
        class="fill-current h-8 w-8 mr-2" 
        width="54" 
        height="54" 
        viewBox="0 0 54 54" 
        xmlns="http://www.w3.org/2000/svg"
        alt="Yescrow logo"
        >
      </Image>
    <span class="font-semibold text-xl tracking-tight hover:text-matrix">Yescrow</span>
    </div>
    </Link>
    <div class="flex-grow flex items-center">
      <div class="text-sm flex-grow"></div>
    <div>
      <ConnectWallet 
        id="connectWallet"
      />
    </div>
  </div>
</nav>
    )
}
