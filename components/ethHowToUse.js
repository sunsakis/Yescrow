import styles from '../styles/Home.module.css'

export default function HowToUse() {
    return (
        <div>
              <h3 className={styles.title}>How does it work?</h3>
              <ul className={styles.card}>
                <b>I!</b> Parties negotiate their unique terms in <u>private</u>.<br/><br/>
                <b>2@</b> Buyer provides the seller`s Ethereum address when depositing.<br/><br/>
                <b>3#</b> Buyer is assigned a unique ID to the deposit.<br/><br/>
                <b>4$</b> When satisfied, the buyer can release the escrow to the seller with one-click using the ID.<br/><br/>
                <b>5%</b> If any party does not uphold their part of the deal, send details of agreement to crow@yescrow.xyz to settle it.
              </ul><br/>           
          </div>
    )
}