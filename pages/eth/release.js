import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import ReleaseForm from "../../components/ethReleaseForm";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Release() {

  return (
      <div className={styles.container}>
        <Head>
          <meta name="robots" content="noindex"></meta>
          <title>Release Ether To Seller - yescrow.xyz</title>
          <meta name="description" content="A simple interface to release your staked Ether."/>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Header />
        <ReleaseForm />
      </main>
        <Footer />
        </div>
  )
}