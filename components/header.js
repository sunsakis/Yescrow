import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
    return (
        <header className={styles.header}>
            <nav>
            <div>
                <Link href="/">
                <Image src="/logo.png" className={styles.logo} alt="yescrow logo" width={100} height={100} />
                </Link>
                <Link href="/" className="block px-3 py-2 transition hover:text-teal-500">
                    <code>yescrow:</code>
                </Link>
                <ul className="block px-3 py-2 flex">
                    <li><Link href="/eth" className="block px-2 py-2 transition hover:text-teal-500">Ethereum</Link></li>
                    <li><Link href="/nft" className="block px-2 py-2 transition hover:text-teal-500">NFT</Link></li>
                    <li><Link href="/usdc" className="block px-2 py-2 transition hover:text-teal-500">USDC</Link></li>
                    <li><Link href="/usdt" className="block px-2 py-2 transition hover:text-teal-500">USDT</Link></li>
                    <li><Link href="/erc20" className="block px-2 py-2 transition hover:text-teal-500">ERC20</Link></li>
                    <li><Link href="/btc" className="block px-2 py-2 transition hover:text-teal-500">Bitcoin</Link></li>
                </ul>
            </div>
            </nav>
        </header>

    )
}
