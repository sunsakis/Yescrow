import Head from 'next/head'
import styles from '../../styles/Home.module.css';
import DepositForm from '../../components/ethDeposit';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Support from '../../components/support';


export default function Eth() {
  
  function addWebsiteJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",

      "@type": "WebPage",
      "name": "Ethereum Escrow",
      "alternateName": "yescrow",
      "url": "https://yescrow.io",
      
      @type: "HowTo",
      name: "How to escrow Ethereum",
      description: "A crypto escrow can be used anytime two parties are engaging 
      in a transaction online or offline selling or buying anything at all and want to 
      ensure that the deal is completed securely and fairly.",
      "image": {
        @type": "ImageObject",
        "url":
        "https://en.wikipedia.org/wiki/File:Ethereum_Background.jpg",
          "width": 400,
          "height": 400
      },
      step: [
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io",
          "name": "Parties negotiate their exclusive terms in private.",
          "position": 1
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io",
          "name": "Depositor provides the Ethereum address of the payee and deposits.",
          "position": 2
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io",
          "name": "Blockchain assigns the escrow a unique ID.",
          "position": 3
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io",
          "name": "When satisfied, the depositor can use it to release the escrow.",
          "position": 4
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io",
          "name": "If any party does not uphold their end of the deal, crow@yescrow.xyz helps.",
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
        <title>Ethereum Smart Contract Escrow Service - yescrow</title>
        <meta name="description" content="A smart contract to help you buy with Ether safely. No need to register - just stake and release ETH to seller when you receive your end of the deal." />
        <link rel="canonical" href="https://yescrow.io/eth" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <Header />  
        <DepositForm />
        <Support />
      </main>
      <Footer />
      </div>
  )
}
