import Head from 'next/head';
import ReleaseForm from "../../components/erc20Release";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Release() {

  return (
      <div>
        <Head>
          <title>Release ERC20 Tokens - yescrow</title>
          <meta name="description" content="A simple interface to one-click release your escrowed ERC20 tokens."/>
          <link rel="icon" href="/favicon.png" />
          <link rel="canonical" href="https://yescrow.io/erc20/escrow" />
        </Head>
        <main>
          <Header />
        <ReleaseForm />
      </main>
        <Footer />
        </div>
  )
}