import Head from 'next/head'
import Footer from '../components/footer';
import Header from '../components/header';
import Image from 'next/image';
import EscrowForm from '../components/depositEur';
import Script from 'next/script';
import TipsButton from '../components/tipsButton';
import Link from 'next/link';


export default function Home() {

  function addWebsiteJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "PaymentService",
        "url": "https://yescrow.io/euro",
        "name": "Yes Crow",
        "alternateName": "YesCrow",
        "description": "Establish trust with strangers - deposit euros with a bank transfer to a SEPA escrow.",
        "potentialAction": {
          "@type": "TransferAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://yescrow.io/#EscrowEuro"
          },
          "description": "Escrow Euro"
        },
        "serviceType": "Euro Escrow",
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
    <div class="container max-w-2xl mx-auto justify-center"
    >
      <Head>
        <title>Yes Crow - Build Trust Online - Escrow Euro (SEPA)</title>
        <meta 
          name="description"
          content="When transacting on the internet - use protection: the only way to trust a stranger online is to use an escrow." 
          />
        <link rel="canonical" href="https://yescrow.io/euro" />
        <link rel="icon" href="/white_crow_icon_black_bg.png" />
      </Head>
      <Script
        id="website-schema"
        dangerouslySetInnerHTML={addWebsiteJsonLd()}
        type="application/ld+json"
      />
        <Header />
        <main>
        <div> 
          <h1 class="m-4 text-4xl text-center font-bold">Establish trust with strangers - deposit euros to a SEPA escrow.</h1>
          <h2 class="m-4 mb-5 font-medium text-center">Escrow money to a European bank account and release it after you get what you wanted: code, work or physical matter.</h2>
        <EscrowForm />
        <p class="text-2xl pt-5 flex justify-center">1% + €10 fee per escrow</p>
        <Image 
        class="mx-auto"
        src="/yescrow_trinity_black_bg.png" 
        alt="how to escrow Ethereum on Yes Crow" 
        width={400} 
        height={340} />
        </div>
        <Link href="/">
          <p class="m-4 text-center font-bold text-xl text-matrix">Escrow on Ethereum`s blockchain</p>
        </Link>
        <TipsButton />
        </main>
      <Footer />
    </div>
    
  )
}