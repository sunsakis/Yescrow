import Head from 'next/head'
import Footer from '../components/footer';
import Header from '../components/header';
import Image from 'next/image';
import EscrowForm from '../components/deposit';
import Faq from '../components/faq';
import Script from 'next/script';
import Table from '../components/table';
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
                  "text": "There are no escrow fees. it is free if the depositor releases the funds to the original recipient. In disputes, Yes Crow can act as the arbiter for a 5% fee."
                }
              },
              {
                "@type": "Question",
                "name": "Is Yes Crow decentralized?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, it is a decentralized service - 2 out of 3 signatures are needed to change the receiver. The depositor, the receiver, and Yes Crow each have one signature."
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
              }
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
        <title>Yes Crow - Build Trust Online - Free Ethereum Escrow dApp</title>
        <meta 
          name="description" 
          content="Get to trust internet strangers without worries. Self-release the payment when you get what you wanted." 
          //When transacting on the internet - use protection: the only way to trust a stranger online is to use an escrow. 
          key="desc"
          />
        <link rel="canonical" href="https://yescrow.io" />
      </Head>
      <Script
        id="website-schema"
        dangerouslySetInnerHTML={addWebsiteJsonLd()}
        type="application/ld+json"
      />
        <Header />
        <main>
        <div> 
          <h1 class="m-4 text-4xl text-center font-bold">Establish trust with strangers using a blockchain escrow.</h1>
          <h2 class="m-4 font-medium text-center">Send a crypto payment to a smart contract, release it yourself after you get what you wanted.</h2>
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
        <Link href="/euro">
          <p class="m-4 text-center font-bold text-xl text-matrix">Escrow Euro</p>
        </Link>
        <Faq />
        <TipsButton />
        </main>
      <Footer />
      
    </div>
    
  )
}