import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Header() {
    return (
        <header className={styles.header}>
            <nav>
            <div>
                <ul className="flex">
                    <li><Link href="/" className="block px-3 py-2 transition hover:text-teal-500"><code>yescrow</code> :</Link></li>
                    <li><Link href="/eth" className="block px-3 py-2 transition hover:text-teal-500">Ethereum</Link></li>
                    <li><Link href="/nft" className="block px-3 py-2 transition hover:text-teal-500">NFT</Link></li>
                </ul>
            </div>
            </nav>
        </header>

    )
}
