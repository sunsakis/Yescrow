import Head from 'next/head';
import ReleaseForm from "../../components/nftRelease";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Release() {

  return (
      <div>
        <Head>
          <title>Release NFT To Buyer - yescrow</title>
          <meta name="description" content="A simple interface to release your staked NFT to the buyer."/>
          <link rel="icon" href="/favicon.png" />
          <link rel="canonical" href="https://yescrow.io/nft/escrow" />
        </Head>
        <main>
          <Header />
        <ReleaseForm />
      </main>
        <Footer />
        </div>
  )
}