import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function About() {
    return (
        <div>
            <h1 className={styles.title}><code style={{color: '#03A062'}}>yescrow:</code> bankless escrow services</h1><br />
            <br/>
        <p>A crypto escrow can be used anytime two parties are engaging in a transaction online or offline selling or buying <b>anything at all</b> and want to ensure that the deal is completed securely and fairly.</p> <br/>
        <p> With a smart contract escrow, the <u>costs are minimized</u> and the processes are automated, meaning you are the one to release the funds once satisfied. </p><br/> <p>Without a bank, a financial service is finally as simple and private as <b>you</b> want it to be.</p><br/>
        <br/><h2 className="text-xl">There is no need to take an unnecessary risk when <b>your money</b> is at stake.</h2>
        {/* <br/><br/><h4>Use <code className="hover:text-teal-500">yescrow</code> to secure your transactions.</h4>
        <p>Escrow 
        <Link href="/eth" className="hover:text-teal-500">Ether</Link>,
        <Link href="/usdc" className="hover:text-teal-500">USDC</Link>, 
        <Link href="/btc" className="hover:text-teal-500">Bitcoin</Link>, 
        <Link href="/nft" className="hover:text-teal-500">NFTs</Link> 
        or any 
        <Link href="/erc20" className="hover:text-teal-500">ERC20</Link> 
        token to secure your payment in an automated, smart contract fashion.</p> */}
         </div>
    )
}