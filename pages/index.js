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

export default function Home( { data, totalDepositedEther } ) {

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
              "name": "Yescrow",
              "description": "Establish trust with online strangers.",
              "potentialAction": {
                "@type": "TransferAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://yescrow.io/#Deposit"
                },
                "description": "Escrow ETH, USDT or USDC"
              },
              "serviceType": "Crypto Escrow",
              "logo": {
                "@type": "ImageObject",
                "url": "https://yescrow.io/white_crow_icon_black_bg.png",
                "width": 600,
                "height": 600
              },
              "provider": {
                "@type": "Organization",
                "name": "Yescrow",
                "email": "sunsakis@pm.me",
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
                  "name": "What is Yescrow?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yescrow is an Ethereum escrow agent that allows strangers to establish trust and transact without knowing each another."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does a crypto escrow work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Designate the receiving address and send crypto to escrow. Release the token as soon as you receive what you agreed upon. If any side is unsatisfied with how the deal turned out, Yescrow will collect evidence from both parties and arbitrate to whom belongs the escrow, keeping 1% of the escrow amount for the work. In case the crypto in escrow was an NFT, Yes Crow will judge free of charge."
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
        <title>Escrow ETH, USDT And USDC | Yes Crow</title>
        <meta 
          name="description" 
          content="Yes Crow is an escrow service that makes escrowing crypto as simple as possible." 
          />
        <meta 
          name="keywords"
          content="escrow, USDT, ETH, USDC, Ether, Ethereum, ERC20"/>
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
          <h1 class="m-4 text-4xl text-center font-bold">Escrow crypto to establish trust online.</h1>
          <p class="m-4 text-xl text-center">Escrowing on Ethereum has never been simpler.</p>
          <br/>
        <EscrowForm />
        <br/>
        <h2 class="m-4 text-xl text-center">Successfully escrowed <Link rel="noopener noreferrer" target="_blank" class="text-matrix hover:underline" href="https://etherscan.io/address/0x450082ade010fe62eb12c08350f0ba3ce55f46ef">${(totalDepositedEther*3333).toFixed(2)}</Link> and counting...</h2>
        <Table data={data} />
        </div>
        <br/>
        <div 
          class="rounded-3xl m-5 pt-3 pb-2 text-center border-2 bg-[#161618]">
            <h2 class="m-4 text-xl font-semibold text-center">IT DOES NOT GET SIMPLER</h2>
            <p class="m-4 font-medium text-center">
              <b class="text-xl text-matrix">1.</b> Type in the escrow amount and the wallet address of the counterparty.
              <br/><br/>
              <b class="text-xl text-matrix">2.</b> Deposit the payment. Release it once you are happy with the deal or get your money back if the deal goes south.
              <br/><br/>
              Voilà! You have just established trust with a stranger.
            </p>
          </div><br/>
          <p class="m-4 text-xl text-center">Would you like to escrow <span class="font-bold">an NFT</span>?
          <br/>
          Then <Link href="/nft" class="underline font-bold text-matrix">NFT escrow</Link> will save your day.
        </p>
          <Image 
        class="mx-auto"
        src="/yescrow_trinity_black_bg.png" 
        alt="how to escrow Ethereum on Yes Crow" 
        width={400} 
        height={340} />
        <br/>
        <Faq />
        </main>
        <br/>
        <div 
          id="crow"
          className="rounded-3xl m-5 pt-3 pb-2 text-center border-2 bg-[#161618]">
            <h3 className="m-4 text-xl font-semibold text-center">Have something in mind?</h3>
            <p class="m-4 font-medium text-center">
              
              We offer <u>custom tailored solutions.</u>
            
              <br/> 
              Contact us to find out more.</p>
          <Link href="mailto:sunsakis@pm.me">
            <Image
              class="mx-auto m-5" 
              src="envelope-white-bg.svg"
              alt="envelope"
              width="50"
              height="25"
            />
          </Link>
            <br/>
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

  // Get the total amount of ETH deposited
  const filter = contract.filters.NewDepositETH();
  const total = await contract.queryFilter(filter, 0, "latest").then((results) => {
    const depAmounts = results.map((result) => result.args.amount);
    const depAmountsInEther = depAmounts.map((amount) => ethers.utils.formatEther(amount));
    const totalDepositedEther = depAmountsInEther.reduce((total, amount) => total + parseFloat(amount), 0);
    return totalDepositedEther;
  });

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

return {
    props: {
      data: formattedData,
      totalDepositedEther: total
    },
    revalidate: 1,
  };
}