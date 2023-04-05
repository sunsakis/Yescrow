import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function About() {
    return (
        <div>
            <h1 className={styles.title}><code style={{color: '#03A062'}}>yescrow:</code> bankless escrow services</h1><br />
            <br/>
        <p>A crypto escrow can be used anytime two parties are engaging in a transaction online or offline selling or buying <b>anything at all</b> and want to ensure that the deal is completed securely and fairly.</p> <br/>
        <p> With a smart contract escrow, the <u>costs are minimized</u> and the processes are automated, meaning you are the one to release the funds once satisfied. </p><br/> <p>Without a bank, a financial service is finally as simple and private as <b>you</b> want it to be.</p><br/>
        <br/><br/><h2 className="text-xl">Why take an unnecessary risk when your money is at stake?</h2>
        <br/><br/><h4>Use <code className="hover:text-teal-500">yescrow</code> to secure your transactions.</h4>
        <p>Escrow <Link href="/eth" className="hover:text-teal-500">Ether</Link>, <Link href="/usdc" className="hover:text-teal-500">USDC</Link>, <Link href="/btc" className="hover:text-teal-500">Bitcoin</Link>, <Link href="/nft" className="hover:text-teal-500">NFTs</Link> or any <Link href="/erc20" className="hover:text-teal-500">ERC20</Link> token to secure your payment in an automated, smart contract fashion.</p>
        <br/><br/><h3 className={styles.title}>Blockchain escrow usecases:</h3><br /><br/>
        <li><b>Freelance work:</b> When hiring a freelancer, an escrow service can be used to hold the payment until the work is completed to the satisfaction of the employer. This provides a level of security for both parties and can help avoid disputes.</li>
        <br/>
        <li><b>Selling code:</b> When you want to sell (or buy) data, it can be hard to be the first to initiate the deal, especially if the other party is uknown to you. If you send the software before you get the money, they might just copy it and not pay you. On the other hand, if you are the first to pay, you might never get the code in return.</li>
        <br/>
        <li><b>NFT and cryptocurrency trades:</b> You can trade crypto and non-fungible tokens into anything you agree on, however, how to enable online trust? Using a crypto escrow can provide security for both the buyer and the seller, ensuring that the transaction is completed fairly.</li>
        <br/>
        <br/>
	<p>Using an audited crypto escrow service can provide peace of mind for both parties involved in <b>any</b> transaction, helping to <u>reduce the risk of fraud</u>. </p>
         </div>
    )
}