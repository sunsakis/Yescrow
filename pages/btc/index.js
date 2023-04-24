import Head from 'next/head'
import styles from '../../styles/Home.module.css';
import DepositForm from '../../components/btcDeposit';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Support from '../../components/support';
import HowToUse from '../../components/howTo';


export default function Btc() {

  function addWebsiteJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      
      "@type": "HowTo",
      "name": "How to escrow bitcoin",
      "description": 
      "This is a workaround for escrowing bitcoin on Ethereum's smart contract system.",
      "image": {
        "@type": "ImageObject",
        "url":
        "https://en.wikipedia.org/wiki/Bitcoin#/media/File:Bitcoin.svg",
          "width": 400,
          "height": 400
      },
      "step": [
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io/btc",
          "name": "Parties negotiate their exclusive terms in private.",
          "position": 1
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io/btc",
          "name": "Depositor provides the wallet of the payee and deposits.",
          "position": 2
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io/btc",
          "name": "A smart contract assigns the escrow a unique ID.",
          "position": 3
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io/btc",
          "name": "When satisfied, the depositor uses it to release the escrow.",
          "position": 4
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io/btc",
          "name": "If any party does not uphold their end of the deal, crow@yescrow.io helps.",
          "position": 5
        }

    }
  `,
    };
  }

  return (
    <div className={styles.container}>
      <Head>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addWebsiteJsonLd()}
          key="website-jsonld"
        />
        <title>Bitcoin Escrow Services - yescrow</title>
        <meta name="description" content="Escrow bitcoin safely. No need to register - just deposit crypto and release it when you receive your end of the deal." />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href="https://yescrow.io/btc" />
      </Head>
      <main className={styles.main}>
        <Header />  
        <DepositForm />
        <br/><h3 className={styles.title}>How to escrow bitcoin?</h3>
        <HowToUse />
        <Support />
      </main>
      <Footer />
      </div>
  )
}
