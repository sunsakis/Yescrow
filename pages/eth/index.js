import Head from 'next/head'
import styles from '../../styles/Home.module.css';
import DepositForm from '../../components/ethDeposit';
import HowToUse from '../../components/ethHowToUse';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Support from '../../components/support';


export default function Eth() {
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Ethereum Smart Contract Escrow Service - yescrow</title>
        <meta name="description" content="A smart contract to help you buy with Ether safely. No need to register - just stake and release ETH to seller when you receive your end of the deal." />
        <link rel="canonical" href="https://yescrow.xyz/eth" />
        <link rel="icon" href="/favicon.png" />
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
