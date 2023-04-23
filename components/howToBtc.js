import styles from '../styles/Home.module.css'

export default function HowToUse() {
    return (
        <div><br/>
        <h3 className={styles.title}>How to escrow bitcoin?</h3><br/>
              <ul className={styles.card}>
                <code>
                <b>1!</b> Parties negotiate their exclusive terms in <u>private</u>.<br/><br/>
                <b>2@</b> Depositor provides the crypto address of the payee and deposits.<br/><br/>
                <b>3#</b> Blockchain assigns the escrow a unique ID.<br/><br/>
                <b>4$</b> When satisfied, the depositor can use it to release the escrow.<br/><br/>
                <b>5%</b> If any party does not uphold their part of the deal, crow@yescrow.xyz helps.
                </code>
              </ul><br/>           
          </div>
    )
}