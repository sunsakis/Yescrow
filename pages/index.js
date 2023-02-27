import Head from 'next/head'
import styles from '../styles/Home.module.css';
import EscrowForm from '../components/escrowForm';
import HowToUse from '../components/howToUse';
import Footer from '../components/footer';

export default function Home() {
  

  return (
    <div className={styles.container}>
      <Head>
        <title>The smart contract escrow of Ethereum : Yescrow</title>
        <meta name="description" content="The fastest, cheapest and simply the most simple way to escrow your money." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>  
        <EscrowForm />
        <HowToUse />
      </main>
      <Footer />
      </div>
  )
}
