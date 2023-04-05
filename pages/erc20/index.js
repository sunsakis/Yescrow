import Head from 'next/head'
import styles from '../../styles/Home.module.css';
import DepositForm from '../../components/erc20Deposit';
import HowToUse from '../../components/ethHowToUse';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Support from '../../components/support';


export default function Escrow() {
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Escrow Any ERC20 Token - yescrow</title>
        <meta name="description" content="A smart contract for escrowing any ERC20 token simply and safely. No need to register - just stake and release tokens to the seller when you receive your end of the deal." />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href="https://yescrow.xyz/erc20" />
      </Head>
      <main className={styles.main}>
        <Header />  
        <DepositForm />
        <HowToUse />
        <Support />
      </main>
      <Footer />
      </div>
  )
}
