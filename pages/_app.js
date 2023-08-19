import "../styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum, Sepolia } from "@thirdweb-dev/chains";
import Script from "next/script";
import Head from "next/head";

function MyApp({ Component, pageProps }) {

  return (
    <ThirdwebProvider 
      activeChain={Ethereum}
      supportedChains={[Ethereum, Sepolia]}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_ID}
    >
      <Component {...pageProps} />
      <Head>
      <link  rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
    </ThirdwebProvider>
  );
}

export default MyApp;