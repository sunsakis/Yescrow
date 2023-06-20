import Head from 'next/head'
import Footer from '../components/footer';
import Header from '../components/header';
import Image from 'next/image';
import EscrowForm from '../components/deposit';
import Faq from '../components/faq';


export default function Home() {

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
        g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
      })();
      `,
    };
  }

  function addWebsiteJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What is Yescrow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yescrow is an Ethereum Virtual Machine compatible escrow agent that allows users to transact with each other without having to trust each other. Yescrow uses smart contracts to ensure that the buyer and seller each fulfill their obligations."
        }
      }, {
        "@type": "Question",
        "name": "How does a crypto escrow work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The depositor can release the funds to the payee only using the same wallet which deposited them. The terms of the deal can remain private or shared on-chain."
        }
      }, {
        "@type": "Question",
        "name": "What are the smart contract escrow fees?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yescrow charges a petite 0.5% fee of the token escrowed (NFTs are escrowed for free). Gas fees can range from $0.01 to $10 depending on network congestion and blockchain used (Ethereum is more expensive than Polygon)."
        }
      }, {
        "@type": "Question",
        "name": "How to escrow crypto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Negotiate your terms in private. You can share the details of the agreement on-chain if you want. Provide the wallet to which you want to transfer your crypto and deposit the agreed amount in escrow. You can then release the crypto to the payee anytime."
        }
      }, {
        "@type": "Question",
        "name": "Can I use Yescrow to escrow NFTs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Yescrow smart contract allows to escrow NFTs. The depositor deposits the NFT in escrow and can release it to the wallet of the other party when satisfied."
        }
      },{
        "@type": "Question",
        "name": "What if someone does not release the escrow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If any side does not uphold their end of the deal, crow@yescrow.io will interfere to make sure that the money goes to the right hands."
        }
        }, {
          "@type": "Question",
          "name": "Is Yescrow decentralized?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, Yescrow is not decentralized, yet. Yescrow is a centralized service that uses smart contracts to ensure that the buyer and seller each fulfill their obligations."
          }
          }, {
            "@type": "Question",
            "name": "Is Yescrow safe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. Our smart contracts have been indepenently audited by <a href="https://github.com/sunsakis/yescrow">Karolis Ramanauskas</a>, who works at 0Xmacro - a leading blockchain security firm. The funds are stored in an encrypted cold wallet."
            }
            }, {
              "@type": "Question",
              "name": "Is Yescrow open-source?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yescrow is open-source. You can find the code on <a href="https://github.com/sunsakis/yescrow">Github</a>."
              }]
    }
  `,
    };
  }

  return (
    <div class="container max-w-2xl mx-auto justify-center">
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={addMatomo()}
          key="website-jsonld"
        />
        <title>Yes Crow - a blockchain-native escrow agent. Open source, decentralized, free.</title>
        <meta 
          name="description" 
          content="Transact with strangers online without worries. Self-release the payment when you get what you wanted." 
          //When transacting on the internet - use protection: the only way to trust a stranger online is to use an escrow. 
          key="desc"
          />
        <link rel="canonical" href="https://yescrow.io" />
        <link rel="icon" href="/white_vector_crow.svg" />
        
      </Head>
        <Header />
        <main>
        <div> 
          <h1 class="m-4 text-4xl text-center font-bold">Never get scammed again.</h1>
          <p class="m-4 font-medium text-center">Lock payments in a smart contract, release them after you get what you wanted.</p>
          <br/>
        <EscrowForm />
        <Image 
        class="mx-auto"
        src="/yescrow_trinity.png" 
        alt="a scheme of how yescrow works" 
        width={400} 
        height={340} />
        </div>
        <br/>
        </main>
        <Faq />
      <Footer />
    </div>
    
  )
}
