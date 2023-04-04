import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import ReleaseForm from "../../components/usdRelease";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Release() {

  return (
      <div className={styles.container}>
        <Head>
          <title>Release USDC Escrow - yescrow</title>
          <meta name="description" content="A simple interface to one-click release your escrowed USDC."/>
          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href="https://yescrow.xyz/usd/escrow" />
        </Head>
        <main className={styles.main}>
          <Header />
        <ReleaseForm />
      </main>
        <Footer />
        </div>
  )
}