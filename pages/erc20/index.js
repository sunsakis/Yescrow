import Head from 'next/head'
import styles from '../../styles/Home.module.css';
import DepositForm from '../../components/erc20Deposit';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Support from '../../components/support';
import HowToUse from '../../components/howTo';


export default function Escrow() {
  
  function addWebsiteJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",

      "@type": "WebPage",
      "name": "ERC20 Escrow",
      "alternateName": "yescrow",
      "url": "https://yescrow.io",
      
      "@type": "HowTo",
      "name": "How to escrow ERC20 tokens",
      "description": "When transacting on the internet - use protection: 
      the only way to trust a stranger online is to use an escrow.",
      "image": {
        "@type": "ImageObject",
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
          "name": "Payer provides the wallet of the payee and deposits.",
          "position": 2
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io",
          "name": "A smart contract assigns the escrow a unique ID.",
          "position": 3
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io",
          "name": "When satisfied, the depositor uses it to release the escrow.",
          "position": 4
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io",
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
        <title>Escrow Any ERC20 Token - yescrow</title>
        <meta name="description" content="A smart contract for escrowing any ERC20 token simply and safely. No need to register - just stake and release tokens to the seller when you receive your end of the deal." />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href="https://yescrow.io/erc20" />
      </Head>
      <main className={styles.main}>
        <Header />  
        <DepositForm />
        <br/><h3 className={styles.title}>How to escrow ERC20 tokens?</h3>
        <HowToUse />
        <Support />
      </main>
      <Footer />
      </div>
  )
}
