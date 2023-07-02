import { useState, React, useEffect } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';
import { BigNumber } from 'ethers';
import { Web3Button } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { Interface, FormatTypes } from '@ethersproject/abi';
import Router from 'next/router';


const humanReadableABI = [
    "function createDepositETH(address _receiver) external payable",
    "function createDepositERC20(address _receiver, address _token, uint256 _amount) external",
    "function releaseDeposit(uint256 _id) external",
    "event NewDepositETH(uint256 indexed depositId, address indexed depositor, address indexed receiver, uint256 amount)",
    "event NewDepositERC20(uint256 indexed depositId, address indexed depositor, address indexed receiver, address token, uint256 amount)",
    "event DepositReleased(uint256 indexed id)"
    ];

const humanReadableERC20ABI = [
    "function approve(address _spender, uint256 _value) external",
    "function symbol() external view returns (string)"
    ];

const iface = new Interface(humanReadableABI);
const jsonABI = iface.format(FormatTypes.json);


export default function Table() {

    useEffect(() => {
        if (!window.ethereum) {
            return;
        }
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MAINNET_V2, humanReadableABI, signer);
        
        const fetchData = async () => {

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
                  const tokenContract = new ethers.Contract(token, humanReadableERC20ABI, signer);
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
                const timestamp = (await provider.getBlock(result.blockNumber)).timestamp;
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
            setData(formattedData);
            
        };
        fetchData();
    }, []);

        const [data, setData] = useState([]);

    
    function addBlock( readableID, amount, transactionHash, depositor, receiver, ticker, age) {
        const txHashLink = "https://etherscan.io/tx/" + transactionHash;
        const depositorAddressLink = "https://etherscan.io/address/" + depositor;
        const receiverAddressLink = "https://etherscan.io/address/" + receiver;
        return (

            <tr key={readableID}>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-white tracking-wider hover:text-black">
                {age} <code>days</code>
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-white tracking-wider hover:text-matrix ">
                {amount} {ticker ? ticker : "ETH"}
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-whitetracking-wider">
                <Link href={txHashLink}
                    onMouseOver={e => e.target.style.color = '#FFD700'}
                    title={transactionHash}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                >
                    <code>{transactionHash.substring(0,4)}..</code>
                </Link>
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-white tracking-wider">
                <Link href={depositorAddressLink}
                    title={depositor}
                    onMouseOver={e => e.target.style.color = '#FFD700'}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                >
                    <code>{depositor.slice(0,4) + ".." + depositor.slice(-2)}</code>
                </Link>
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-white tracking-wider">
                <Link href={receiverAddressLink}
                title={receiver}
                onMouseOver={e => e.target.style.color = '#FFD700'}
                rel="noopener noreferrer nofollow"
                target="_blank"
                >
                    <code>{receiver.slice(0,4) + ".." + receiver.slice(-2)}</code>
                </Link>
            </th>
            <th scope="col" class="px-1 py-3 text-left text-xs font-medium text-white tracking-wider">
            <Web3Button
                contractAddress={process.env.NEXT_PUBLIC_MAINNET_V2}
                contractAbi={jsonABI}
                action={async (contract) => {await contract.call("releaseDeposit", [readableID], {gasLimit: 250000})}}
                onError={() => alert("Not your funds. Only depositor address can release this escrow.")}
                onSuccess={() => Router.reload(window.location.pathname)}
                className={styles.rls}
                
            >
                    Release
                </Web3Button>
            </th>
          </tr>
            );
    }


        return (
        <div class="flex flex-col">
            <h3 class="text-2xl font-bold m-4 mb-1 text-white text-center">Your assets in escrow:</h3>
          <div class="my-2 overflow-x-auto sm:mx-6 lg:mx-2">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-3">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-green-100 px-10 ">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                            Age
                        </th>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                            Value
                        </th>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                            txHash
                        </th>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                            Depositor
                        </th>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                            Receiver
                        </th>
                        <th scope="col" class="px-4 py-3 justify-items-center text-xs font-medium text-gray-500 tracking-wider">
                            <Image
                                src="/lock_icon.png" 
                                class="h-5 w-5 ml-2" 
                                width="30" 
                                height="30" 
                                alt="lock icon">
                            </Image>
                        </th>
                      </tr>
                      </thead>
                    <tbody class="bg-[#3B3B3B] divide-y-2 divide-[#161618] ">
                    {data.slice().reverse().map((item) => (
                        addBlock(
                        item.depositId,
                        item.amount,
                        item.transactionHash,
                        item.depositor,
                        item.receiver,
                        item.ticker,
                        item.age
                        )
                    ))}
                    </tbody>
                  </table>
              </div>
          </div>
          </div>
      </div>
)}