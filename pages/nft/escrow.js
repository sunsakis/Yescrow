import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import ReleaseForm from "../../components/nftRelease";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Release() {

  return (
      <div className={styles.container}>
        <Head>
          <title>Release NFT To Buyer - yescrow</title>
          <meta name="description" content="A simple interface to release your staked NFT to the buyer."/>
          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href="https://yescrow.xyz/nft/escrow" />
        </Head>
        <main className={styles.main}>
          <Header />
        <ReleaseForm />
      </main>
        <Footer />
        </div>
  )
}