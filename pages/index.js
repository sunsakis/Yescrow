import { Network, Alchemy } from 'alchemy-sdk';
import { ethers, BigNumber } from 'ethers';
import Head from 'next/head'
import Footer from '../components/footer';
import Header from '../components/header';
import Image from 'next/image';
import EscrowForm from '../components/deposit';
import Faq from '../components/faq';
import Script from 'next/script';
import Table from '../components/table';
import Link from 'next/link';

const ABI = [
  "function createDepositETH(address _receiver) external payable",
  "function createDepositERC20(address _receiver, address _token, uint256 _amount) external",
  "function releaseDeposit(uint256 _id) external",
  "event NewDepositETH(uint256 indexed depositId, address indexed depositor, address indexed receiver, uint256 amount)",
  "event NewDepositERC20(uint256 indexed depositId, address indexed depositor, address indexed receiver, address token, uint256 amount)",
  "event DepositReleased(uint256 indexed id)"
  ];

const ERC20ABI = [
  "function approve(address _spender, uint256 _value) external",
  "function symbol() external view returns (string)"
  ];

export default function Home( { data } ) {

  function addWebsiteJsonLd() {
    return {
      __html: 
        `
        {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "PaymentService",
              "url": "https://yescrow.io",
              "name": "Yes Crow",
              "alternateName": "YesCrow",
              "description": "Establish trust with online strangers.",
              "potentialAction": {
                "@type": "TransferAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://yescrow.io/#Deposit"
                },
                "description": "Escrow USDT"
              },
              "serviceType": "USDT Escrow",
              "logo": {
                "@type": "ImageObject",
                "url": "https://yescrow.io/white_crow_icon_black_bg.png",
                "width": 600,
                "height": 600
              },
              "provider": {
                "@type": "Organization",
                "name": "Yes Crow",
                "email": "escrow@yescrow.io",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer support"
                }
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
                    "text": "Yes Crow is an Ethereum escrow agent that allows strangers to establish trust and transact without knowing each another."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does a crypto escrow work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Designate the receiving address and send crypto to escrow. Release the token as soon as you receive what you agreed upon. If any side is unsatisfied with how the deal turned out, Yes Crow will collect evidence from both parties and arbitrate to whom belongs the escrow, keeping 1% of the escrow amount for the work. In case the crypto in escrow was an NFT, Yes Crow will judge free of charge."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does it cost to escrow?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ETH and ERC20 tokens - 0.5% fee per escrow + gas. If you escrow NFTs, you only pay for the gas."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What if the depositor does not release the funds?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "If the designated receiver does not contact us within 90 days to claim the funds, the depositor is then allowed to withdraw them back to their Ethereum wallet."
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
        <title>Escrow USDT and ETH | Yes Crow</title>
        <meta 
          name="description" 
          content="Yes Crow is a decentralized escrow service with the intention to let people escrow their crypto as simply as possible." 
          />
        <meta 
          name="keywords"
          content="escrow, USDT, service"/>
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
          <h1 class="m-4 text-4xl text-center font-bold">Escrow USDT to establish trust online.</h1>
          <p class="m-4 text-xl text-center"><i>Yes Crow</i> is a decentralized escrow service with the intention to let people escrow their crypto as simply as possible.</p>
          <br/>
        <EscrowForm />
        <br/>
        <Table data={data} />
        <p class="m-4 text-xl text-center">Would you like to escrow your <span class="font-bold">NFT</span>?
          <br/>
          We offer a <Link href="/nft" class="underline font-bold">NFT escrow service</Link>. Just pay for the gas.
        </p>
        <Image 
        class="mx-auto"
        src="/yescrow_trinity_black_bg.png" 
        alt="how to escrow Ethereum on Yes Crow" 
        width={400} 
        height={340} />
        </div>
        <div 
          class="rounded-3xl m-5 pt-3 pb-2 text-center border-2 bg-[#161618]">
            <h2 class="m-4 text-xl font-semibold text-center">USDT escrow service - at your service. In the escrow form, just choose the amount to escrow and the wallet address of the counterparty.</h2>
            <p class="m-4 font-medium text-center">
              Deposit your payment and release it once you are happy with the deal.
              <br/>
              You will never have to wait for the middleman to comply ever again. 
              <br/> 
              All transactions are transparent on Ethereum`s blockchain!
            </p>
            <p class="m-4 font-medium text-center">
              
                We also offer <u>custom tailored solutions.</u>
              
                <br/> 
                Contact us to find out more.</p>
            <Link href="mailto:escrow@yescrow.io">
              <Image
                class="mx-auto m-5" 
                src="envelope-white-bg.svg"
                alt="envelope"
                width="50"
                height="25"
              />
            </Link>
          </div>
        <br/>
        <Faq />
        </main>
        <br/>
        <div 
          id="crow"
          className="rounded-3xl m-5 pt-3 pb-2 text-center border-2 bg-[#161618]">
            <h3 className="m-4 text-xl font-semibold text-center">Affiliation with $CROW token.</h3>
              <b>Yes Crow</b> and <b>$CROW</b> token are separate entities managed by different people.
              <br/>
              <br/>
              You do not need to use any kind of tokens to use Yes Crow, just good ol` Ether.
              <br/>
              <p>Yes Crow does not endorse $CROW in any way.</p>
              <br/> 
            <p>Yes Crow does not believe social media. We believe in decentralization.</p>
            <p className="m-4 font-medium text-center">
                $CROW socials:</p>
              <div className="flex justify-center">
                <Link href="https://t.me/YesCrowETH" rel="nofollow noopenner external" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 496 512" className="fill-white m-3"><path d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"/></svg>
                </Link>
                <Link href="https://x.com/Yescrowerc20" rel="nofollow noopenner external" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512" className="fill-white m-3"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                </Link>
              </div>
          </div>
        <br/>
        <br/>
      <Footer />
      
    </div>
    
  )
}

export async function getStaticProps() {

  const settings = {
    apiKey: process.env.ALCHEMY_API, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };


  const alchemy = new Alchemy(settings);
  const ethersProvider = await alchemy.config.getProvider();
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MAINNET, ABI, ethersProvider);
  const newDepositETH = await contract.queryFilter("NewDepositETH", 0, "latest");
  const newDepositERC20 = await contract.queryFilter("NewDepositERC20", 0, "latest");
  const releasedDepositResults = await contract.queryFilter("DepositReleased", 0, "latest");

  

  const resultsWithoutReleasedETHDeposits = newDepositETH.filter((result) => {
    const depositId = result.args.depositId;
    const isReleased = releasedDepositResults.some((releasedDepositResult) => {
        const releasedDepositId = releasedDepositResult.args.id;
        return depositId.eq(releasedDepositId);
    });
    return !isReleased;
});

  const resultsWithoutReleasedERC20Deposits = newDepositERC20.filter((result) => {
    const depositId = result.args.depositId;
    const isReleased = releasedDepositResults.some((releasedDepositResult) => {
        const releasedDepositId = releasedDepositResult.args.id;
        return depositId.eq(releasedDepositId);
    });
    return !isReleased;
  });

  const concatData = resultsWithoutReleasedETHDeposits.concat(resultsWithoutReleasedERC20Deposits);

  const formattedData = await Promise.all(concatData.map(async (result) => {
                
    const {
        depositId, 
        depositor, 
        receiver, 
        amount,
        token,
        
    } = result.args;

    async function getTokenTicker(tokenContract) {
        try {
          const ticker = await tokenContract.symbol();
          return ticker;
        } catch (error) {
          console.error('Error occurred while fetching token ticker:', error);
          return ''; // Return an empty string in case of an error
        }
      }

    let ticker = '';
    if (token) {
      const tokenContract = new ethers.Contract(token, ERC20ABI, ethersProvider);
      ticker = await getTokenTicker(tokenContract, signer);
    }

    function calculateAge(timestamp) {
        const currentTime = Math.floor(Date.now() / 1000);
        const ageInSeconds = currentTime - timestamp;
        const ageInMinutes = Math.floor(ageInSeconds / 60);
        const ageInHours = Math.floor(ageInMinutes / 60);
        const ageInDays = Math.floor(ageInHours / 24);
        return ageInDays;
        }

    function sortAge(timestamp) {
        const currentTime = Math.floor(Date.now() / 1000);
        const ageInSeconds = currentTime - timestamp;
        return ageInSeconds;
        }

    const transactionHash = result.transactionHash;
    const amountInETH = ethers.utils.formatEther(amount);
    const readableID = BigNumber.from(depositId).toString();
    const timestamp = (await ethersProvider.getBlock(result.blockNumber)).timestamp;
    const age = calculateAge(timestamp);
    const ageInSeconds = sortAge(timestamp);

    return {
        depositId: readableID,
        depositor: depositor,
        receiver: receiver,
        amount: amountInETH,
        transactionHash: transactionHash,
        ticker: ticker,
        age: age,
        ageInSeconds: ageInSeconds,
    };
}, [], 
));

formattedData.sort((a, b) => b.ageInSeconds - a.ageInSeconds);
console.log(formattedData);

return {
    props: {
      data: formattedData,
    },
    revalidate: 1,
  };
}