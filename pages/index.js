import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Footer from '../components/footer';
import Header from '../components/header';
import About from '../components/about';
import Support from '../components/support';
import HowTo from '../components/howTo';
import EthEscrowForm from '../components/ethDeposit';


export default function Home() {

  function addWebsiteJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      
      "@type": "HowTo",
      "name": "How to escrow crypto",
      "description": "A crypto escrow should be used anytime two parties are engaging in a transaction online or offline selling or buying anything at all and want to ensure that the deal is completed securely, fairly and in time.",
      "image": {
        "@type": "ImageObject",
        "url": "https://en.wikipedia.org/wiki/File:Ethereum_Background.jpg",
          "width": 400,
          "height": 400
      },
      "step": [
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io#how-to-escrow",
          "name": "Parties negotiate their exclusive terms in private.",
          "position": 1
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io#how-to-escrow",
          "name": "Payer provides the wallet of the payee and deposits.",
          "position": 2
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io#how-to-escrow",
          "name": "A smart contract assigns the escrow a unique ID.",
          "position": 3
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io#how-to-escrow",
          "name": "When satisfied, the depositor uses it to release the escrow.",
          "position": 4
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io#how-to-escrow",
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
        <title>yescrow - Blockchain Escrow Services: Trust Anonymously</title>
        <meta 
          name="description" 
          content="Blockchain escrow services to facilitate online trust. No need to register, simply deposit and release when you are satisfied." 
          key="desc"
          />
        <link rel="canonical" href="https://yescrow.io" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <Header /> 
        <h1 className={styles.title}><code style={{color: '#03A062'}}>yescrow:</code> blockchain escrow services</h1>
        <br/>
        <About />
        <HowTo />
        <EthEscrowForm />
        <Support />
      </main>
      <Footer />
    </div>
  )
}
