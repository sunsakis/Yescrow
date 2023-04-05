import Head from 'next/head'
import styles from '../../styles/Home.module.css';
import DepositForm from '../../components/nftDeposit';
import NftHowToUse from '../../components/nftHowToUse';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Support from '../../components/support';

export async function getStaticProps() {
  return {
    props: {
      pageId: "nft_escrow"
    }
  }
}

export default function Nft() {
  

    return (
      <div className={styles.container}>
        <Head>
          <title>NFT Escrow Smart Contract - yescrow</title>
          <meta name="description" content="A smart contract to help you sell your NFTs safely. No need to register, no fee (just pay for gas)." />
          <link rel="canonical" href="https://yescrow.xyz/nft" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <main className={styles.main}>
          <Header />  
          <DepositForm />
          <NftHowToUse />
          <Support />
        </main>
        <Footer />
        </div>
    )
  }