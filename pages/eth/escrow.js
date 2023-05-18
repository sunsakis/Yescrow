import Head from 'next/head';
import ReleaseForm from "../../components/ethRelease";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Release() {

  return (
      <div>
        <Head>
          <title>Release Ether To Seller - yescrow</title>
          <meta name="description" content="A simple interface to release your staked Ether."/>
          <link rel="icon" href="/favicon.png" />
          <link rel="canonical" href="https://yescrow.io/eth/escrow" />
        </Head>
        <main>
          <Header />
        <ReleaseForm />
      </main>
        <Footer />
        </div>
  )
}