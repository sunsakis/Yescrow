import Head from 'next/head'
import styles from '../../styles/Home.module.css';
import EthEscrowForm from '../../components/ethEscrowForm';
import HowToUse from '../../components/ethHowToUse';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Support from '../../components/support';


export default function Eth() {
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Contract Ethereum Escrow Service - yescrow</title>
        <meta name="description" content="A smart contract to help you buy with Ether safely. No need to register - just stake and release ETH to seller when you receive your end of the deal." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />  
        <EthEscrowForm />

        <HowToUse />
        <Support />
      </main>
      <Footer />
      </div>
  )
}
