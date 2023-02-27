import Link from "next/link";
import styles from '../styles/Home.module.css'

export default function HowToUse() {
    return (
        <div>
              <h2 className={styles.title}>How to use the escrow?</h2><br/><br/><br/>
              <h2>The 5 commandments:</h2>
              <ul className={styles.card}>
                <b>!</b> Parties negotiate their terms in private (amount, delivery time).<br/><br/>
                <b>2@</b> Buyer provides the seller`s address when escrowing Ether.<br/><br/>
                <b>3#</b> Buyer is assigned a unique ID to his/her deposit.<br/><br/>
                <b>4$</b> Buyer can <Link href="/release">release the escrow</Link> using the ID as a key.<br/><br/>
                <b>5%</b> In case of disagreement, crow@yescrow.xyz settles it for 5%.
              </ul><br/>
              <h4>Any questions?<br /><br /> Ask the <br />crow@yescrow.xyz <br/>
              <br/> OR <br/><br/> annoy <br/><br/>the dev<br/> on <br/><br/><a href="https://t.me/sunsakis" rel="nofollow">Telegram</a></h4>           
          </div>
    )
}