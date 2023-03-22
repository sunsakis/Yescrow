import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import ReleaseNftForm from "../../components/nftReleaseForm";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Release() {

  return (
      <div className={styles.container}>
        <Head>
        <meta name="robots" content="noindex"></meta>
          <title>Release NFT To Buyer - yescrow.xyz</title>
          <meta name="description" content="A simple interface to release your staked NFT to the buyer."/>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Header />
        <ReleaseNftForm />
      </main>
        <Footer />
        </div>
  )
}