import Link from "next/link";
import styles from '../styles/Home.module.css'

export default function HowToUse() {
    return (
        <div>
              <h2> Show the buyer proof that you have deposited your NFT in one click. <br/><br/>Then let them do their part.</h2><br/><br/><br/>
              <h3 className={styles.title}>How does it work?</h3>
              <ul className={styles.card}>
                <b>1!</b> Parties negotiate their unique terms in <u>private</u>.<br/><br/>
                <b>2@</b> Seller provides the buyer`s Ethereum address when depositing.<br/><br/>
                <b>3#</b> Seller is assigned a unique ID to the deposit.<br/><br/>
                <b>4$</b> When satisfied, the seller can <Link href="/nft/release">release the escrow</Link> to the buyer with one-click using the ID.<br/><br/>
                <b>5%</b> If any party does not uphold their part of the deal, send details of the agreement to crow@yescrow.xyz to settle it.
              </ul><br/>
          </div>
    )
}