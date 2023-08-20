import Link from "next/link"
import Head from 'next/head'
import Script from 'next/script';
import Footer from '../components/footer';
import Header from '../components/header';
import Image from 'next/image';
import EscrowButton from '../components/escrowButton';

export default function Tips() {

      function addWebsiteJsonLd() {
        return {
          __html: `{
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "A fool-proof way to avoid getting scammed by online strangers that want to sell you their services or goods.",
            "datePublished": "2023-07-07",
            "dateModified": "2023-07-07",
            "description": "Learn how to protect yourself from online scams by using an escrow service.",
            "articleBody": "Let me show you that it is completely possible to protect yourself from an online scammer by using an escrow as if it were your scam shield. For free. Absolutely for free. Can't believe it? Yes, this trick is that mighty. So bear with me as I show you how to navigate the matrix.\n\nI just received an e-mail...",
            "author": {
              "@type": "Person",
              "name": "sunsAkis"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Yes Crow",
              "logo": {
                "@type": "ImageObject",
                "url": "https://yescrow.io/metamask_fees.png",
                "width": 600,
                "height": 600
              }
            }
          }
      `,
        };
      }

    return (
        <div class="container max-w-2xl mx-auto justify-center">
      <Head>
        <title>How To Not Get Scammed - Free Advice By Yes Crow</title>
        <meta 
          name="description" 
          content="When transacting on the internet - use protection: the only way to trust a stranger online is to use an escrow." 
          //When transacting on the internet - use protection: the only way to trust a stranger online is to use an escrow. 
          key="desc"
          />
        <link rel="canonical" href="https://yescrow.io/tips/how-to-not-get-scammed" />
      </Head>
      <Script
            id="schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={addWebsiteJsonLd()}
            key="website-jsonld"
            />
        <Header />
        <main>
            <h1 class="m-4 text-4xl text-center font-bold">How to not get scammed online by strangers that want to sell you their services or goods.</h1>
            <br/><p>
            Let me show you that it is completely possible to protect yourself from an online scammer by using an escrow as if it were your scam shield. Yes, this trick is mighty. So bear with me as I show you how to navigate the Matrix.
            </p>
            <br/>
            <p>
            I just received an e-mail. It said: &quot;<i>If you would like to rank your product in the top position of Producthunt.com, please contact me. It is totally organic and safe method.</i>&quot;
            </p>
            <br/>
            <p>
            Now you probably do understand I had some suspicions about this. Should I send the guy some money to rank? How can I know that he does not walk away from the deal? After all, all I got is his e-mail, which is not much…
            </p>
            <br/>
            <p>
            However, I did reply to the man on the other side of the wire with this: &quot;<i>Hello, Abdul-Aziz! Sure. How much would you like me to escrow you for the service? <span class="text-lg">As soon as the product is ranked in the top position, as you suggested - I will release the money to you.</span></i>&quot;
            </p>
            <br/>
            <p>
            The guy responded by telling me the amount to escrow, now I know he means business.<br/>
            </p>
            <br/>
            <br/>
            <h2 class="m-4 text-3xl text-center font-bold">
            Understanding <Link href="/">Yes Crow - A Powerful Yet Simple Escrow Tool</Link>
            </h2>
            <br/>
            <p>
            Escrow is an agreement in which a third party holds the funds until the condition of the deal is fulfilled, properly. 
            <br/><br/>In the case of Yes Crow, the funds are held on a smart contract on the Ethereum blockchain. It is a simple logic written in code, public and verified to be unbreakable. Just connect your crypto wallet at the top right of the page and follow the lead. 
            </p>
            <br/>
            <p class="text-3xl">(</p>
            <p>
            By creating a MetaMask account, you automatically get an Ethereum wallet, so that’s two birds - one shot. And voila, welcome aboard the new World Wide Web, where you are your own bank and only you are responsible for your own funds.
            <br/>
            <p class="text-3xl">)</p>
            </p>
            <br/>
            <p>
            Now you can use MetaMask to sign transactions and <Link href="/usdt" class="text-blue-500"> escrow crypto dollars (stablecoins)</Link>, Ether, or any other tokens on the Ethereum blockchain!
            <br/><br/>
            To send a crypto escrow you will need some ETH in your wallet to pay for gas. Gas pays the miners to keep mining the blockchain and validating transactions.
            <br/><br/> 
            Every transaction on Ethereum’s blockchain costs gas, a way to look at it - it costs a little bit to be in control over your money. 
            <br/><br/>
            And these fees are <b>multitudes cheaper than traditional escrow services</b>.
            </p>
            <br/>
            <div class="mt-5 flex justify-center">
            <Image
                src="/escrow_com_fees.png"
                alt="Escrow.com fees"
                width={500}
                height={500}
            />
            </div>
            <label class="flex justify-center">Above are escrow fees on the popular online platform escrow.com.</label>
            <br/><br/>
            <div class="flex justify-center">
            <Image
                src="/metamask_fees.png"
                alt="Yes Crow fees"
                width={500}
                height={500}
            />
            </div>
            <label class="flex justify-center">Above was the gas fee for using Yes Crow + 0.5% escrow fee.</label>
            <br/><br/>
            <br/>
            <h3 class="m-4 text-2xl text-center font-bold">How to use a crypto escrow in real life?</h3>
            <br/> 
            <ul class="list-disc">
                <li>
                <b>In an online transaction</b>: 
                </li>
                <br/>
                <p>
                &quot;<i>Hi Jennifer, I`m interested in purchasing your antique collectibles that you wrote about in the forum. To ensure a secure transaction, I suggest we use Yes Crow, a crypto escrow tool. Once I deposit the agreed-upon sum into escrow, you will see it on their homepage and once I receive the items in the promised condition, the funds will be released to you.</i>&quot;
                </p>
                <br/>
                <li>
                    <b>Freelance service agreement</b>:
                </li>
                <br/>
                <p>
                &quot;<i>Hi Sarah, I`m considering hiring your software development company for a project. In order to protect both parties and ensure timely delivery, I suggest using an escrow arrangement. I will deposit the project`s funds. As we reach specific milestones, you can request the release of a portion of the funds from the escrow account. This way, we can ensure that the project progresses smoothly, and both parties are satisfied with the results.</i>&quot;
                </p>
                <br/>
                <li>
                    <b>Product acquisition</b>:
                </li>
                <br/>
                <p>
                &quot;<i>Dear Mr. Rodriguez, I am interested in acquiring your company. To ensure a fair and secure transaction, I propose using an escrow service. We can agree on a purchase price, and I will deposit the funds into an escrow account. The funds will be held until due diligence is completed, including legal, financial, and operational assessments. If everything checks out, the funds will be released to you, and the ownership of the company will be transferred to me.</i>&quot;
                </p><br/>
                <li>
                <b>Crowdfunding campaign</b>:
                </li>
                <br/>
                <p>
                    &quot;<i>Hey everyone, I am launching a crowdfunding campaign to bring my innovative product to market. To establish trust and transparency, I will be using an escrow service. This way, backers can be confident that their contributions are protected, and I can proceed with manufacturing and delivering the product. If the campaign fails to reach its goal, the funds will be returned to the backers.</i>&quot;
                </p><br/>
                <li>
                    <b>Dispute resolution</b>:
                </li>
                <br/>
                <p>
                    &quot;<i>Hi there, to build trust and ensure transparency in our agreement, let`s incorporate an escrow service. By depositing the funds into an escrow account, we establish a transparent and verifiable payment process. This way, both parties can track the progress of the transaction and have peace of mind knowing that the funds are protected until all the obligations are fulfilled.</i>&quot;
                </p><br/>
            </ul>
            <br/>
            <p>
            <h4 class="text-2xl">I think you get the idea. You were <b>smart</b> enough to find this article, I believe you are a smart person. Assess the risk and do the calculated thing.</h4>
            </p>
            <br/><br/>
            <h4 class="m-4 text-xl text-center font-bold">What happens if the other party does not release the funds?</h4>
            <br/>
            <p>
            If the other party does not release the funds for at least 3 months, you can open a dispute. The dispute will be reviewed by the Yes Crow team, and if the dispute is found to be valid, the funds will be released minus 1% fee.
            </p>
            <br/><br/>
            <h5 class="m-4 text-xl text-center font-bold">TL;DR: why Yes Crow?</h5>
            <br/>
            <p class="text-md mb-2">
            By incorporating escrow into your online interactions, you can safeguard your transactions, promote trust, encourage truth and minimize the potential to fall victim for scams. Protect yourself and your business by embracing this powerful tool and enjoy peace of mind in online dealings.
            </p>
        </main>
        <EscrowButton/>
        <Footer />
        </div>
    )
}
        
