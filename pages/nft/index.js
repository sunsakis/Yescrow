import Head from 'next/head'
import styles from '../../styles/Home.module.css';
import DepositForm from '../../components/nftDeposit';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Support from '../../components/support';
import HowToUse from '../../components/howToNFT';

export async function getStaticProps() {
  return {
    props: {
      pageId: "nft_escrow"
    }
  }
}

export default function Nft() {

  function addWebsiteJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      
      "@type": "HowTo",
      "name": "How to escrow NFT",
      "description": "When selling your non-fungible token, safety matters - 
      the only way to trust anonymously is to use an escrow.",
      "image": {
        "@type": "ImageObject",
        "url":
        "https://en.wikipedia.org/wiki/File:Ethereum_Background.jpg",
          "width": 400,
          "height": 400
      },
      "step": [
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io/nft#how-to-escrow",
          "name": "Parties negotiate their exclusive terms in private.",
          "position": 1
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io/nft#how-to-escrow",
          "name": "Seller provides the NFT details and deposits in yescrow.",
          "position": 2
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io/nft#how-to-escrow",
          "name": "A smart contract assigns the escrow a unique ID.",
          "position": 3
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io/nft#how-to-escrow",
          "name": "When satisfied, the depositor uses MetaMask to release the escrow.",
          "position": 4
        },
        {
          "@type": "HowToStep",
          "url": "https://yescrow.io/nft#how-to-escrow",
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
          <title>NFT Escrow Smart Contract - yescrow</title>
          <meta name="description" content="A smart contract to help you sell your NFTs safely. No need to register, no fee (just pay for gas)." />
          <link rel="canonical" href="https://yescrow.io/nft" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <main className={styles.main}>
          <Header />  
          <DepositForm />
          <br/><h3 className={styles.title}>How to escrow NFT?</h3>
          <HowToUse />
          <Support />
        </main>
        <Footer />
        </div>
    )
  }