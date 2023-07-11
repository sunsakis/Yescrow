import Link from "next/link"
import Head from 'next/head'
import Script from 'next/script';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Image from 'next/image';
import EscrowButton from '../../components/escrowButton';

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
        <title>Yes Crow - How To Not Get Scammed - Free Advice</title>
        <meta 
          name="description" 
          content="When transacting on the internet - use protection: the only way to trust a stranger online is to use an escrow." 
          //When transacting on the internet - use protection: the only way to trust a stranger online is to use an escrow. 
          key="desc"
          />
        <link rel="canonical" href="https://yescrow.io/tips/how-to-not-get-scammed" />
        <link rel="icon" href="/white_crow_icon_black_bg.png" />
      </Head>
      <Script
            id="schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={addWebsiteJsonLd()}
            key="website-jsonld"
            />
        <Header />
        <main>
            <h1 class="m-4 text-4xl text-center font-bold">A fool-proof way to avoid getting scammed by online strangers that want to sell you their services or goods.</h1>
            <br/><p>
            Let me show you that it is completely possible to protect yourself from an online scammer by using an escrow as if it were your scam shield. For free. Absolutely for free. Can`t believe it? Yes, this trick is that mighty. So bear with me as I show you how to navigate the matrix.
            </p>
            <br/>
            <p>
            I just received an e-mail. In it, it said: &quot;<i>If you would like to rank your product in the top position of Producthunt.com, please contact me. It is totally organic and safe method.</i>&quot;
            </p>
            <br/>
            <p>
            Now you probably do understand I had some suspicions about this here. Should I send the dude some money to rank? How can I know he does not walk away from the deal? After all, all I got is his e-mail, which is not much…
            </p>
            <br/>
            <p>
            However, I did reply to the man on the other side of the wire. &quot;<i>Hello, Heron! Sure. How much would you like me to escrow you for the service? As soon as the product is ranked in the top position, as you suggested - I will release the money to you.</i>&quot;
            </p>
            <br/>
            <p>
                Let me just say, the guy has not responded yet…<br/>
                <i>Edit:</i> The guy responded, told me the sum to escrow, now I know he is legit.
            </p>
            <br/>
            <p>
            In case he would not have gotten back to me after I mentioned I am ready to escrow him the payment, I would have know the guy to be a sham. Also, if he were to start yapping about how he does not want to use an escrow - scam alert!
            </p>
            <br/>
            <h2 class="m-4 text-3xl text-center font-bold">
            Understanding <Link href="/">Yes Crow - A Powerful Yet Simple Escrow Tool</Link>
            </h2>
            <br/>
            <p>
            Escrow is an agreement in which a third party holds the funds until the conditions of the deal are fulfilled, properly. In the case of Yes Crow, the funds are held on a smart contract that lives on the Ethereum`s blockchain. It is a simple logic written in code, public and verified to be unbreakable. No one can change it. You don’t need to trust Yes Crow, only trust in logic. To use Yes Crow, all you need to do is install MetaMask - an extension of your browser. If you do not have MetaMask installed, just click on “Connect Wallet” that you see at the top right of the page and follow the lead. 
            </p>
            <br/>
            <p>
            By creating a MetaMask account, you automatically get an Ethereum wallet, so that’s two birds - one shot. And voila, welcome aboard the New World Wide Web, where you are your own bank and only you are responsible for your own funds. This does come with some caveats, but the advantages far outweigh the disadvantages.
            </p>
            <br/>
            <p>
            Now you can use MetaMask to sign transactions and escrow crypto dollars (stablecoins), Ether, or any other tokens on the Ethereum’s blockchain. If you would like to send an escrow, however, you will need to get some ETH (Ether) in your wallet to pay for gas. Every transaction on Ethereum’s blockchain costs gas, but the way we see it is that it costs a little bit to be in total control over your money. And these fees, they are 100x lower than traditional escrow services.
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
            <label class="flex justify-center">Above are escrow fees on the popular online platform escrow.com</label>
            <br/><br/>
            <div class="flex justify-center">
            <Image
                src="/metamask_fees.png"
                alt="Yes Crow fees"
                width={500}
                height={500}
            />
            </div>
            <label class="flex justify-center">Above was the fee for using Yes Crow. The difference is clear.</label>
            <br/><br/>
            <h3 class="m-4 text-2xl text-center font-bold">So what is escrow, exactly?</h3>
            <br/>
            <p>
            Escrow is a financial arrangement where a third party holds and regulates the funds until a transaction between two parties is completed. Acting as a neutral intermediary, the escrow service ensures that both parties fulfill their obligations, mitigating the risks associated with fraudulent activities.
            </p>
            <br/>
            <p>
            Our newly developed escrow tool is a cutting-edge solution designed to provide enhanced security and peace of mind in online transactions. The escrow smart contract logic is open-source and made free to use because we believe that it would be unethical to earn money for doing nothing (once the smart contract is deployed, it can be used indefinitely without any wear and tear). However, in case something goes wrong and you would like to return or release the escrow, then you contact us and Yes Crow collects relevant data and acts as arbitrage. So in case of bad luck and some party not fulfilling their obligations, you would lose 5% of your escrow as our arbitrage fee, however, you still get to keep 95% of the payment, which is nothing for a fraudster to smile about.
            </p>
            <br/>
            <p>
            By offering an additional layer of protection, this tool aims to prevent scams and foster truth and trust among parties involved. By being a bankless solution, we cut usage costs and pass it on to the users. Where else can you escrow for the equivalent of $10 bucks? This is the price you would pay for gas if you wanted to make an Ether escrow today, and with time as Ethereum Virtual Machine is being improved, the gas prices seem to be getting even lower.
            </p>
            <br/>
            <p>
            We thought it would be cool for you to see some real life examples how a crypto escrow might be used, so we collected a bunch of stories.
            </p>
            <br/>
            <h3 class="m-4 text-2xl text-center font-bold">How to use a crypto escrow in real life?</h3>
            <br/> 
            <ul class="list-disc">
                <li>
                <b>An online transaction</b>: 
                </li>
                <br/>
                <p>
                &quot;<i>Hi Jennifer, I`m interested in purchasing your antique collectibles that you wrote about in the forum. To ensure a secure transaction, I suggest we use Yes Crow, a crypto escrow tool. We can deposit the agreed-upon amount into escrow, and once I receive the items in the promised condition, the funds will be released to you.</i>&quot;
                </p>
                <br/>
                <li>
                    <b>Freelance service agreement</b>:
                </li>
                <br/>
                <p>
                &quot;<i>Hi Sarah, I`m considering hiring your software development company for a project. In order to protect both parties and ensure timely delivery, I suggest using an escrow arrangement. We can establish an escrow account where I will deposit the project`s funds. As we reach specific milestones or deliverables, you can request the release of a portion of the funds from the escrow account. This way, we can ensure that the project progresses smoothly, and both parties are satisfied with the results.</i>&quot;
                </p>
                <br/>
                <li>
                    <b>Product acquisition</b>:
                </li>
                <br/>
                <p>
                &quot;<i>Dear Mr. Rodriguez, I am interested in acquiring your company. To ensure a fair and secure transaction, I propose using an escrow service. We can agree on a purchase price, and the buyer will deposit the funds into an escrow account. The funds will be held until the necessary due diligence is completed, including legal, financial, and operational assessments. If everything checks out, the funds will be released to you, and the ownership of the company will be transferred to me.</i>&quot;
                </p><br/>
                <li>
                <b>Crowdfunding campaign</b>:
                </li>
                <br/>
                <p>
                    &quot;<i>Hey everyone, I am launching a crowdfunding campaign to bring my innovative product to market. To establish trust and transparency, I will be using an escrow service. Once the campaign reaches its funding goal, the funds will be deposited into an escrow account. This way, backers can be confident that their contributions are protected, and I can proceed with manufacturing and delivering the product. If the campaign fails to reach its goal, the funds will be returned to the backers.</i>&quot;
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
            <h4>I think you get the idea. You were smart enough to find this article, I believe you are a smart person. Assess the risk and do the calculated thing.</h4>
            </p>
            <br/><br/>
            <h4 class="text-xl mb-2">
            By incorporating the escrow tool into your online interactions, you can safeguard your transactions, promote trust, encourage truth and minimize the potential to fall victim for scams. Protect yourself and your business by embracing this powerful tool and enjoy peace of mind in online dealings.
            </h4>
        </main>
        <EscrowButton/>
        <Footer />
        </div>
    )
}
        
