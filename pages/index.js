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
            "@graph": 
              [
                {
                  "@type": "PaymentService",
                  "url": "https://yescrow.io",
                  "name": "Yes Crow",
                  "alternateName": "YesCrow",
                  "description": "Establish trust with online strangers.",
                  "potentialAction": 
                    {
                      "@type": "TransferAction",
                      "target": 
                        {
                          "@type": "EntryPoint",
                          "urlTemplate": "https://yescrow.io/#Deposit"
                        },
                      "description": "Escrow USDT"
                    },
                  "serviceType": "USDT Escrow",
                  "logo": 
                    {
                      "@type": "ImageObject",
                      "url": "https://yescrow.io/white_crow_icon_black_bg.png",
                      "width": 600,
                      "height": 600
                    },
                  "provider": 
                    {
                      "@type": "Organization",
                      "name": "Yes Crow",
                      "email": "escrow@yescrow.io",
                      "contactPoint": 
                        {
                          "@type": "ContactPoint",
                          "contactType": "customer support"
                        },
                    }
                },
            {
              "@type": "FAQPage",
              "mainEntity": 
                [
                  {
                    "@type": "Question",
                    "name": "What is Yes Crow?",
                    "acceptedAnswer": 
                      {
                        "@type": "Answer",
                        "text": "Yes Crow is an Ethereum escrow agent that allows strangers to establish trust and transact without knowing each another."
                      }
                  },
                  {
                    "@type": "Question",
                    "name": "How does a crypto escrow work?",
                    "acceptedAnswer": 
                      {
                        "@type": "Answer",
                        "text": "Designate the receiving address and send crypto to escrow. Release the token as soon as you receive what you agreed upon.
                        If any side is unsatisfied with how the deal turned out, Yes Crow will collect evidence from both parties and arbitrate to whom belongs the escrow, keeping 1% of the escrow amount for the work.
                        In case the crypto in escrow was an NFT, Yes Crow will judge free of charge."
                      }
                  },
                  {
                    "@type": "Question",
                    "name": "How much does it cost to escrow?",
                    "acceptedAnswer": 
                      {
                        "@type": "Answer",
                        "text": "ETH and ERC20 tokens - 0.5% fee per escrow + gas.
                          If you escrow NFTs, you only pay for the gas."
                      }
                  },
                  {
                    "@type": "Question",
                    "name": "What if the depositor does not release the funds?",
                    "acceptedAnswer": 
                      {
                        "@type": "Answer",
                        "text": "If the designated receiver does not contact us within 90 days to claim the funds, the depositor is then allowed to withdraw them back to their Ethereum wallet."
                      }
                  }
                ]
            }}
              ]
          }      
        `,
    };
  }

  return (
    <div class="container max-w-2xl mx-auto justify-center">
      <Head>
        <title>Escrow USDT | Yes Crow</title>
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
        <div class="flex justify-center">
        <p class="inline-block justify-end"><Link href="/info" class="hover:text-matrix">Info</Link></p>
        </div>
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