import Head from 'next/head'
import styles from '../styles/Home.module.css';
import EscrowForm from '../components/escrowForm';
import HowToUse from '../components/howToUse';
import Footer from '../components/footer';

export default function Home() {
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Escrow Enabling Online Trust: Fast, Simple And Cheap</title>
        <meta name="description" content="Automated escrow services are finally here. No need to register, simply lock USD or ETH to a smart contract and release it with one click. Private and secure." />
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
