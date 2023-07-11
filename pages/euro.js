import Head from 'next/head'
import Footer from '../components/footer';
import Header from '../components/header';
import Image from 'next/image';
import EscrowForm from '../components/depositEur';
import Faq from '../components/faq';
import Script from 'next/script';
import TipsButton from '../components/tipsButton';
import Link from 'next/link';


export default function Home() {

  function addWebsiteJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
  "@graph": [
    {
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
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Yes Crow?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes Crow is a multisig Ethereum Virtual Machine escrow agent that allows users to transact with each other without having to trust each other."
          }
        },
        {
          "@type": "Question",
          "name": "What cryptocurrencies does Yes Crow support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes Crow supports Ethereum and all the other ERC20 tokens such as USDT, USDC, DAI, LINK, UNI, etc."
          }
        },
        {
          "@type": "Question",
          "name": "How can I contact customer support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can contact our customer support by emailing escrow@yescrow.io."
          }
        },
        {
          "@type": "Question",
          "name": "How does Yes Crow work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "By sending a cryptocurrency with the receiver's address to the smart contract. You can release the deposit to the receiver as soon as you get what you wanted."
          }
        },
        {
          "@type": "Question",
          "name": "What are the escrow fees?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "There are no escrow fees. it is free if the depositor releases the funds to the original recipient. In disputes, Yes Crow can act as the arbitre for a 5% fee."
          }
        },
        {
          "@type": "Question",
          "name": "Is Yes Crow decentralized?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it is a decentralized service - 2 out of 3 signatures are needed to change the receiver. The depositor, the receiver and Yes Crow each have one signature."
          }
        },
        {
          "@type": "Question",
          "name": "What if the depositor does not release the funds?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If the designated receiver does not contact us within 90 days to claim the funds, the depositor is then allowed to withdraw them."
          }
        },
        {
          "@type": "Question",
          "name": "How can I know that I can trust Yes Crow, though?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The smart contract is public. Audited by @karooolis from Macro - a leading blockchain security firm. Emails are encrypted, data is stored in Western Europe."
          }
        },
      ]
    }
  ]
      }
      `,
    };
  }

  return (
    <div class="container max-w-2xl mx-auto justify-center">
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
          <h1 class="m-4 text-4xl text-center font-bold">Establish trust with strangers - deposit to a SEPA escrow.</h1>
          <h2 class="m-4 mb-5 font-medium text-center">Send euro payments to a European escrow bank account and we will release them after you get what you wanted.</h2>
        <EscrowForm />
        <p class="text-2xl p-5 flex justify-center">1% + €10 fee per escrow</p>
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