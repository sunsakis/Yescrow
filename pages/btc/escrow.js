import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import ReleaseForm from "../../components/btcRelease";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Release() {

  return (
      <div className={styles.container}>
        <Head>
          <title>Release WBTC Escrow To Seller - yescrow</title>
          <meta name="description" content="A simple interface to release your wrapped bitcoin to the seller's Ethereum address."/>
          <link rel="icon" href="/favicon.png" />
          <link rel="canonical" href="https://yescrow.xyz/btc/escrow" />
        </Head>
        <main className={styles.main}>
          <Header />
        <ReleaseForm />
      </main>
        <Footer />
        </div>
  )
}