import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ReleaseForm from "../components/releaseForm";
import Footer from "../components/footer";

export default function Release() {

  return (
      <div className={styles.container}>
        <Head>
          <title>Crypto Escrow - Release Ether With 1 Click : Yescrow.xyz</title>
          <meta name="description" content="A bankless, fully automated Ethereum escrow for putting money where the mouth is."/>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
        <ReleaseForm />
      </main>
        <Footer />
        </div>
  )
}