import "../styles/globals.css";
import React, { useEffect } from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { init } from "@socialgouv/matomo-next";
import { Ethereum, Sepolia } from "@thirdweb-dev/chains";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    init({
      url: process.env.NEXT_PUBLIC_MATOMO_URL,
      siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
    });
  }, []);

  return (
    <ThirdwebProvider 
      activeChain={Ethereum}
      supportedChains={[Ethereum, Sepolia]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;