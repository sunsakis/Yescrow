import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Footer from '../components/footer';
import Header from '../components/header';
import About from '../components/about';
import Support from '../components/support';
import HowToUse from '../components/howToUse';
import EthEscrowForm from '../components/ethDeposit';

export default function Home() {

  function addWebsiteJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "Yescrow",
      "alternateName": "yescrow.xyz",
      "url": "https://yescrow.xyz"
    }
  `,
    };
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>yescrow - Blockchain Escrow Services: Trust Anonymously</title>
        <meta 
          name="description" 
          content="Blockchain escrow services to facilitate online trust. No need to register, simply deposit and release when you are satisfied." 
          key="desc"
          />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addWebsiteJsonLd()}
          key="website-jsonld"
        />
        <link rel="canonical" href="https://yescrow.xyz" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <Header /> 
        <h1 className={styles.title}><code style={{color: '#03A062'}}>yescrow:</code> blockchain escrow services</h1>
        <br/>
        <About />
        <HowToUse />
        <EthEscrowForm />
        <Support />
      </main>
      <Footer />
    </div>
  )
}
