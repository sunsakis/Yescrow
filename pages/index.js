import Head from 'next/head'
import Footer from '../components/footer';
import Header from '../components/header';
import Image from 'next/image';
import EscrowForm from '../components/deposit';
import Faq from '../components/faq';
import Script from 'next/script';
import Table from '../components/table';
import TipsButton from '../components/tipsButton';


export default function Home() {

  function addWebsiteJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "PaymentService",
        "url": "https://yescrow.io",
        "name": "Yes Crow",
        "alternateName": "YesCrow",
        "description": "Establish trust with strangers using a blockchain escrow.",
        "potentialAction": {
          "@type": "TransferAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://yescrow.io/#Deposit"
          },
          "description": "Escrow"
        },
        "serviceType": "Ethereum Escrow",
        "logo": {
          "@type": "ImageObject",
          "url": "https://yescrow.io/white_crow_icon_black_bg.png",
          "width": 600,
          "height": 60
        },
        "provider": {
          "@type": "Organization",
          "name": "Yes Crow",
          "email": "escrow@yescrow.io",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support"
          },
          "sameAs": [
            "https://twitter.com/theyescrow"
          ]
        }
      }
      `,
    };
  }

  return (
    <div class="container max-w-2xl mx-auto justify-center">
      <Head>
        <title>Yes Crow - Build Trust Online - Free Ethereum Escrow dApp</title>
        <meta 
          name="description" 
          content="Get to trust internet strangers without worries. Self-release the payment when you get what you wanted." 
          //When transacting on the internet - use protection: the only way to trust a stranger online is to use an escrow. 
          key="desc"
          />
        <link rel="canonical" href="https://yescrow.io" />
        <link rel="icon" href="/white_crow_icon_black_bg.png" />
      </Head>
      <Script
        dangerouslySetInnerHTML={addWebsiteJsonLd()}
        type="application/ld+json"
      />
        <Header />
        <main>
        <div> 
          <h1 class="m-4 text-4xl text-center font-bold">Establish trust with strangers using a blockchain escrow.</h1>
          <h2 class="m-4 font-medium text-center">Send a crypto payment to a smart contract, release it after you get what you wanted.</h2>
          <br/>
        <EscrowForm />
        <Table />
        <Image 
        class="mx-auto"
        src="/yescrow_trinity_black_bg.png" 
        alt="how to escrow Ethereum on Yes Crow" 
        width={400} 
        height={340} />
        </div>
        <br/>
        </main>
        <Faq />
        <TipsButton />
      <Footer />
      
    </div>
    
  )
}