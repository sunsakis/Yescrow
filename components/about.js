import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function About() {
    return (
        <div>
        <h1 className={styles.title}>Crypto escrow usecases:</h1><br /><br/>
        <p>An escrow service can be used anytime two parties are engaging in a transaction online or offline selling or buying <b>anything at all</b> and want to ensure that the deal is completed securely and fairly.</p> <br/>
        <p> With a crypto escrow, the costs are minimized so you don`t even need to transact in big sums.</p><p><br/>Here are some common usecases:<br/> <br/></p>
        <li><b>Freelance work:</b> When hiring a freelancer, an escrow service can be used to hold the payment until the work is completed to the satisfaction of the employer. This provides a level of security for both parties and can help avoid disputes.</li>
        <br/>
        <li><b>Selling data:</b> When you want to sell (or buy) software, it can be hard to be the first to initiate the deal, especially if the other party is uknown to you. If you send the code before you get the money, they might just copy it and not pay you. On the other hand, if you are the first to pay, you might never get the code in return.</li>
        <br/>
        <li><b>NFT and cryptocurrency trades:</b> You can trade crypto and non-fungible tokens into anything you agree on, however, how to enable online trust? Using a crypto escrow can provide security for both the buyer and the seller, ensuring that the transaction is completed fairly.</li>
        <br/>
        <li><b>Real estate transactions:</b> When buying or selling property using cryptocurrencies, using an escrow service can ensure that the transaction is completed securely and that both parties fulfill their obligations.</li>
        <br/>
        <br/>
	<p>Using a crypto escrow service can provide peace of mind for both parties involved in a transaction, helping to <u>reduce the risk of fraud</u>. </p>
        <br/><br/><h2 className="text-xl">Why take an unnecessary risk when your money is at stake?</h2>
        <br/><br/><h3>Use <code className="hover:text-teal-500">yescrow</code> to secure your transactions.</h3>
        <p>Escrow <Link href="/eth" className="hover:text-teal-500">Ether</Link> and <Link href="/nft" className="hover:text-teal-500">NFTs</Link> in an automated manner.</p>
        </div>
    )
}