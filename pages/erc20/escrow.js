import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import ReleaseForm from "../../components/erc20Release";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Release() {

  return (
      <div className={styles.container}>
        <Head>
          <title>Release ERC20 Tokens - yescrow</title>
          <meta name="description" content="A simple interface to one-click release your escrowed ERC20 tokens."/>
          <link rel="icon" href="/favicon.png" />
          <link rel="canonical" href="https://yescrow.xyz/erc20/escrow" />
        </Head>
        <main className={styles.main}>
          <Header />
        <ReleaseForm />
      </main>
        <Footer />
        </div>
  )
}