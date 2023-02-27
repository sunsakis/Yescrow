import Link from "next/link";
import styles from '../styles/Home.module.css'

export default function HowToUse() {
    return (
        <div>
              <h2>An escrow for all things digital: NFT, code, software... Escrow virtually anything.</h2><br/><br/><br/>
              <h3 className={styles.title}>How does it work?</h3>
              <ul className={styles.card}>
                <b>I!</b> Parties negotiate their unique terms in private.<br/><br/>
                <b>2@</b> Buyer provides the seller`s Ethereum address and deposits.<br/><br/>
                <b>3#</b> Buyer is assigned a unique ID to his/her deposit.<br/><br/>
                <b>4$</b> When satisfied, the buyer can <Link href="/release">release the escrow</Link> to the seller with one click.<br/><br/>
                <b>5%</b> If any party does not uphold their part of the deal, send details of agreement to crow@yescrow.xyz to settle it.
              </ul><br/>
              <h4>Any questions?<br /><br /> Ask the <br />crow@yescrow.xyz <br/>
              <br/> OR <br/><br/> annoy <br/><br/>the dev<br/> on <br/><br/><a href="https://t.me/sunsakis" rel="nofollow">Telegram</a></h4>           
          </div>
    )
}