import styles from '../styles/Home.module.css'

export default function HowToUse() {
    return (
        <div><br/>
              <h3 className={styles.title}>How does a smart contract escrow work?</h3>
              <ul className={styles.card}>
                <code>
                <b>1!</b> Parties negotiate their unique terms in <u>private</u>.<br/><br/>
                <b>2@</b> Depositor provides the other party`s Ethereum address when escrowing.<br/><br/>
                <b>3#</b> Deposit is assigned a unique escrow ID.<br/><br/>
                <b>4$</b> When satisfied, the depositor can release the escrow with one-click.<br/><br/>
                <b>5%</b> If any party does not uphold their part of the deal, send details of agreement to crow@yescrow.xyz to settle it.
                </code>
              </ul><br/>           
          </div>
    )
}