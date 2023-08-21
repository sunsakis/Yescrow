import Head from 'next/head'
import Footer from '../components/footer';
import Header from '../components/header';
import Image from 'next/image';
import Script from 'next/script';
import Table from '../components/table';
import TipsButton from '../components/tipsButton';
import Link from 'next/link';
import EscrowForm from '../components/erc20Deposit';
import Faq from '../components/faq';
import { ethers, BigNumber } from 'ethers';
import { Network, Alchemy } from 'alchemy-sdk';

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

export default function Home( {data} ) {

  function addWebsiteJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "PaymentService",
            "url": "https://yescrow.io/erc20",
            "name": "Yes Crow",
            "alternateName": "YesCrow",
            "description": "Establish trust with strangers using a blockchain escrow.",
            "potentialAction": {
              "@type": "TransferAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://yescrow.io/erc20#EscrowERC20"
              },
              "description": "Escrow ERC20"
            },
            "serviceType": "ERC20 Escrow",
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
        <title>ERC20 Escrow Service - Super Smooth - Yes Crow!</title>
        <meta 
          name="description" 
          content="Get to trust internet strangers without worries. Self-release the payment when you get what you wanted." 
          //When transacting on the internet - use protection: the only way to trust a stranger online is to use an escrow. 
          key="desc"
          />
        <link rel="canonical" href="https://yescrow.io/erc20" />
      </Head>
      <Script
        id="website-schema"
        dangerouslySetInnerHTML={addWebsiteJsonLd()}
        type="application/ld+json"
      />
        <Header />
        <main>
        <div> 
          <h1 class="m-4 text-4xl text-center font-bold">Establish trust with strangers using a ERC20 escrow agent.</h1>
          <h2 class="m-4 font-medium text-center">Send tokens to a smart contract, release them yourself after you get what you wanted. Everything is transparent on the blockchain.</h2>
          <br/>
          <div class="m-2 flex justify-center text-center border-2 p-5 rounded-3xl bg-[#161618]"
                id="EscrowERC20">
        <EscrowForm />
        </div>
        <Table data={data}/>
        <Image 
        class="mx-auto"
        src="/yescrow_trinity_black_bg.png" 
        alt="how to escrow ERC20 tokens on Yes Crow" 
        width={400} 
        height={340} />
        </div>
        <br/>
        <p class="m-4 text-center font-bold text-xl">Escrow: <Link href="/usdt" class="text-matrix">USDT</Link> | <Link href="/usdc" class="text-matrix">USDC</Link> | <Link href="/erc20" class="text-matrix">ERC20</Link></p>
        <Faq />
        <TipsButton />
        </main>
      <Footer />
      
    </div>
    
  )
}

export async function getServerSideProps() {

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
  };
}