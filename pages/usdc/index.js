import Head from 'next/head'
import styles from '../../styles/Home.module.css';
import DepositForm from '../../components/usdcDeposit';
import HowToUse from '../../components/ethHowToUse';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Support from '../../components/support';


export default function Escrow() {
  

  return (
    <div className={styles.container}>
      <Head>
        <title>USDC Escrow Services - yescrow</title>
        <meta name="description" content="A smart contract for escrowing USDC simply and safely. No need to register - just stake and release crypto to the seller when you receive your end of the deal." />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href="https://yescrow.xyz/usdc" />
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
