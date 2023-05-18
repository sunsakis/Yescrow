import "../styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum, Sepolia } from "@thirdweb-dev/chains";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={Ethereum}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
