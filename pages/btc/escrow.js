import Head from 'next/head';
import ReleaseForm from "../../components/btcRelease";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Release() {

  return (
      <div>
        <Head>
          <title>Release WBTC Escrow To Seller - yescrow</title>
          <meta name="description" content="A simple interface to release your wrapped bitcoin to the seller's Ethereum address."/>
          <link rel="icon" href="/favicon.png" />
          <link rel="canonical" href="https://yescrow.io/btc/escrow" />
        </Head>
        <main>
          <Header />
        <ReleaseForm />
      </main>
        <Footer />
        </div>
  )
}