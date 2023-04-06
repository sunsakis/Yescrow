import styles from '../styles/Home.module.css'

export default function Usecases() {
    return (
        <div>
            <br/>
            <br/>
            <h3 className={styles.title}>Blockchain escrow usecases:</h3>
            <br/><br/>
            <li>
                <b>Freelance work:</b> When hiring a freelancer, an escrow service can be used to hold the payment until the work is completed to the satisfaction of the employer. This provides a level of security for both parties and can help avoid disputes.</li>
            <br/>
            <li>
                <b>Selling code:</b> When you want to sell (or buy) data, it can be hard to be the first to initiate the deal, especially if the other party is uknown to you. If you send the software before you get the money, they might just copy it and not pay you. On the other hand, if you are the first to pay, you might never get the code in return.</li>
            <br/>
            <li>
                <b>NFT and cryptocurrency trades:</b> You can trade crypto and non-fungible tokens into anything you agree on, however, how to enable online trust? Using a crypto escrow can provide security for both the buyer and the seller, ensuring that the transaction is completed fairly.</li>
            <br/>   
            <br/>
            <p>Using an audited crypto escrow service can provide peace of mind for both parties involved in <b>any</b> transaction, helping to <u>reduce the risk of fraud</u>. </p>     
        </div>
    )
}