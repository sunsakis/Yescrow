import Head from 'next/head'
import styles from '../../styles/Home.module.css';
import DepositForm from '../../components/usdtDeposit';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Support from '../../components/support';
import HowTo from '../../components/howTo';


export default function Escrow() {

  function addWebsiteJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      
      "@type": "HowTo",
      "name": "How to escrow USDT",
      "description": "When transacting online, safety matters - the only way to trust anonymously is to use an escrow.
      ",
      "image": {
        "@type": "ImageObject",
        "url":
        "/usdt.png",
          "width": 400,
          "height": 400
      },
      step: [
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io/usdt",
          "name": "Parties negotiate their exclusive terms in private.",
          "position": 1
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io/usdt",
          "name": "Payer provides the wallet of the payee and deposits.",
          "position": 2
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io/usdt",
          "name": "A smart contract assigns the escrow a unique ID.",
          "position": 3
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io/usdt",
          "name": "When satisfied, the depositor uses it to release the escrow.",
          "position": 4
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io/usdt",
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
        <title>USDT Escrow Services - yescrow</title>
        <meta name="description" content="A smart contract for escrowing USDT simply and safely. No need to register - just stake and release crypto to the seller when you receive your end of the deal." />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href="https://yescrow.io/usdt" />
      </Head>
      <main className={styles.main}>
        <Header />  
        <DepositForm />
        <br /><h3 className={styles.title}>How to escrow USDT?</h3>
        <HowTo />
        <Support />
      </main>
      <Footer />
      </div>
  )
}
