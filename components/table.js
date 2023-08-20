import Image from 'next/image';
import { Web3Button } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';
import { Interface, FormatTypes } from '@ethersproject/abi';
import Router from 'next/router';



const ABI = [
    "function createDepositETH(address _receiver) external payable",
    "function createDepositERC20(address _receiver, address _token, uint256 _amount) external",
    "function releaseDeposit(uint256 _id) external",
    "event NewDepositETH(uint256 indexed depositId, address indexed depositor, address indexed receiver, uint256 amount)",
    "event NewDepositERC20(uint256 indexed depositId, address indexed depositor, address indexed receiver, address token, uint256 amount)",
    "event DepositReleased(uint256 indexed id)"
    ];

const iface = new Interface(ABI);
const jsonABI = iface.format(FormatTypes.json);


export default function Table( { data } ) {
    
    function addBlock( readableID, amount, transactionHash, depositor, receiver, ticker, age) {

        const copyHash = (e) => {
            navigator.clipboard.writeText(transactionHash)
            e.target.style.color = '#FFD700'
            setTimeout(() => {
                e.target.style.color = '#ffffff'
                alert("Copied tx hash!")
            }
            , 1)
        }

        const copyDepositor = (e) => {
            navigator.clipboard.writeText(depositor)
            e.target.style.color = '#FFD700'
            setTimeout(() => {
                e.target.style.color = '#ffffff'
                alert("Copied depositor's address!")
            }
            , 1)
        }

        const copyReceiver = (e) => {
            navigator.clipboard.writeText(receiver)
            e.target.style.color = '#FFD700'
            setTimeout(() => {
                e.target.style.color = '#ffffff'
                alert("Copied receiver's address!")
            }
            , 1)
        }

        const fadeColor = (e) => {
            e.target.style.color = '#FFD700'
            setTimeout(() => {
                e.target.style.color = '#ffffff'
            }
            , 1000)
        }

        return (

            <tr key={readableID}>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-white tracking-wider">
                <p  id="age"
                    onMouseOver={e => e.target.style.color = '#FFD700'}
                    onMouseOut={fadeColor}
                >
                    {age} <code>days</code>
                </p>
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-white tracking-wider">
                <p id="amount"
                    onMouseOver={e => e.target.style.color = '#FFD700'}
                   onMouseOut={fadeColor}
                >
                    {amount} {ticker ? ticker : "ETH"}
                </p>
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-white tracking-wider">
                <p  
                    class="cursor-pointer"
                    id="hash"
                    onMouseOver={e => e.target.style.color = '#FFD700'}
                    onClick={copyHash}
                    title={transactionHash}
                >
                    <code>{transactionHash.substring(0,4)}..</code>
                </p>
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-white tracking-wider">
                <p  
                    class="cursor-pointer"
                    id="depositor"
                    title={depositor}
                    onMouseOver={e => e.target.style.color = '#FFD700'}
                    onClick={copyDepositor}
                    
                >
                    <code>{depositor.slice(0,4) + ".." + depositor.slice(-2)}</code>
                </p>
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-white tracking-wider">
            <p 
                class="cursor-pointer"
                id="receiver"
                title={receiver}
                onMouseOver={e => e.target.style.color = '#FFD700'}
                onClick={copyReceiver}
                >
                    <code>{receiver.slice(0,4) + ".." + receiver.slice(-2)}</code>
                </p>
            </th>
            <th scope="col" class="px-1 py-3 text-left text-xs font-medium text-white tracking-wider">
            <Web3Button
                contractAddress={process.env.NEXT_PUBLIC_MAINNET}
                contractAbi={jsonABI}
                action={async (contract) => {await contract.call("releaseDeposit", [readableID], {gasLimit: 250000})}}
                onError={() => alert("Not your funds. Only the depositor can release this escrow.")}
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
            <h3 class="text-2xl font-bold m-4 mb-1 text-white text-center">Crypto in escrow:</h3>
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
                    <tbody class="bg-[#161618] divide-y-2 divide-[#161618] ">
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

// I have an HTML table with rows. In every row there is some long text that is shortened to fit on the screen.  
// I want to show the full text when the user hovers over the text.
// I tried to use the title attribute, but it doesn't work. I also tried to use the onmouseover event, but it doesn't work either.
// How can I do this?
