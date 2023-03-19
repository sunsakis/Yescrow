import styles from '../styles/Home.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <nav>
            <div>
                <ul className="flex">
                    <li><a href="/" className="block px-3 py-2 transition hover:text-teal-500"><code>yescrow</code> :</a></li>
                    <li><a href="/eth" className="block px-3 py-2 transition hover:text-teal-500">Ethereum</a></li>
                    <li><a href="/nft" className="block px-3 py-2 transition hover:text-teal-500">NFT</a></li>
                </ul>
            </div>
            </nav>
        </header>

    )
}
