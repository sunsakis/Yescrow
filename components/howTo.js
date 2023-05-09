import styles from '../styles/Home.module.css'

export default function HowToUse() {
    return (
      
        <div>
              <h3 className={styles.title}>How to escrow crypto?</h3>
              <ul className={styles.card} id="how-to-escrow">
                <code>
                <b>1!</b> Parties negotiate their exclusive terms in <u>private</u>.<br/><br/>
                <b>2@</b> Payer provides the wallet of the payee and deposits in yescrow.<br/><br/>
                <b>3#</b> A smart contract assigns the escrow a unique ID.<br/><br/>
                <b>4$</b> When satisfied, the depositor uses MetaMask to release the escrow.<br/><br/>
                <b>5%</b> If any party does not uphold their end of the deal, crow@yescrow.io helps.
                </code>
              </ul><br/>           
          </div>
    )
}