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

  function addMatomo() {
    return {
      __html: `
      var _paq = window._paq || [];
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
        _paq.push(['setTrackerUrl', 'https://yescrow.matomo.cloud/piwik.php']);
        _paq.push(['setSiteId', 1]);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type='text/javascript'; g.async=true; g.defer=true; g.src='https://yescrow.matomo.cloud/piwik.js'; s.parentNode.insertBefore(g,s);
      })();
      `,
    };
  }

  return (
    <ThirdwebProvider 
      activeChain={Ethereum}
      supportedChains={[Ethereum, Sepolia]}
    >
      <Component {...pageProps} />
      <Script
          id="matomo"
          type="text/javascript"
          dangerouslySetInnerHTML={addMatomo()}
          key="website-jsonld"
        />
    </ThirdwebProvider>
  );
}

export default MyApp;