import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";

const ESCROW_ABI = [
  "function createDepositERC721(address _seller, address _token, uint256[] calldata _tokenIds) external",
  "event NewDepositERC721(uint256 indexed currentId, address indexed buyer, address indexed seller, address token, uint256[] tokenIds)",
];

const ERC721_ABI = [
  "function approve(address to, uint256 tokenId) public"
];

export const injected = new InjectedConnector({
  supportedChainIds: [1, 11155111],
});

export default function EscrowForm() {
  const [_tokenIds, setIDValue] = useState("");
  const [_seller, setSellerAddress] = useState("");
  const [_nftAddress, setNftAddress] = useState("");
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [accounts, setAccounts] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  function handleIDChange(e) {
    setIDValue(e.target.value);
  }

  function handleAddressChange(e) {
    setSellerAddress(e.target.value);
  }

  function handleNftAddressChange(e) {
    setNftAddress(e.target.value);
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetaMask(true);
    }
  }, []);

  const {
    active,
    activate,
    chainId,
    account,
    library: provider,
  } = useWeb3React();

  async function blockchainTalk(e) {
    e.preventDefault();
    if (hasMetaMask == true) {
      const chainId = await ethereum.request({ method: "eth_chainId" });
      if (chainId !== "0x1") {
        alert("Please select the Ethereum mainnet on your MetaMask.");
      }
      if (chainId == "0x1") {
        try {
          await activate(injected);
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts.length == 0) {
            setAccounts("Connect your Metamask account");
          } else { if (isConnected == false) {
            alert("Your Ethereum account "+accounts+" is now connected. You may escrow now.")
            setIsConnected(true) }}
        } catch (e) {
          console.log(e);
        }
      }
      try {
        if (active) {
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_MAINNET_ADDRESS,
            ESCROW_ABI,
            signer
          );

          const nftContract = new ethers.Contract(
            _nftAddress,
            ERC721_ABI,
            signer
          );

          try { 
              const approveTx = await nftContract.approve(contract.address, _tokenIds, {
                gasLimit: 100000,
              });
              alert("Approving escrow of NFTs...")
              await approveTx.wait()
              alert("Approved escrow of NFTs. Now you can escrow your NFT.");
            
            const createDepositTx =  await contract.createDepositERC721(_seller, _nftAddress, [_tokenIds], {
              gasLimit: 300000,
            });
            await createDepositTx.wait();
          
          } catch (error) {
            console.log(error),
              alert(
                "The transaction failed. Please make sure you approve escrowing the NFTs in your Metamask account and try again."
              );
          }
        
          try {
            contract.on(
              "NewDepositERC721",
              (
                counter,
                buyerAddress,
                sellerAddress,
                _nftAddress,
                _tokenIds,
                event
              ) => {

                  console.log(
                    "Buyer address: " + buyerAddress,
                    "Seller address: " + sellerAddress,
                    "Escrow amount: " + _tokenIds,
                    "Escrow ID: " + counter,
                    "Buyer's NFT address: " + _nftAddress,
                    "Transaction hash: " + event.transactionHash
                  );

                  alert(
                    "Appreciate the patience. Your escrow has been created. Save your ID#: " +counter+ "." 
                  );
              }
            );
          } catch (error) {
            console.log(error);
          }
        }
      } catch {
        alert(
          "Fix the error and please make sure to fill in the form correctly."
        );
      }
    } else {
      alert("Please install MetaMask browser extension.");
    }
  }

  return (
    <div className={styles.main}>
      <form id="formId" className={styles.form} onSubmit={blockchainTalk}>
        {/* Should alert if user clicks button but is not connected to mainnet */}
        <h1 className={styles.title}>♦ Ethereum escrow for NFTs</h1>
        <br />
        <p>
          When selling your NFT, safety matters - the only way to trust
          anonymously is to use an escrow.
        </p>
        <div className={styles.description}>
          <label>Buyer`s Ethereum address</label>
          <br />
          <input
            className={styles.input}
            type="text"
            placeholder="0x..."
            required
            minLength="42"
            maxLength="42"
            onChange={handleAddressChange}
          />
          <br />
          <label>NFT address</label>
          <br />
          <input
            className={styles.input}
            type="text"
            placeholder="0x..."
            minLength="42"
            maxLength="42"
            onChange={handleNftAddressChange}
            required
          />
          <br />
          <label>NFT ID</label>
          <br />
          <input
            className={styles.input}
            type="number"
            placeholder="#"
            step="1"
            onChange={handleIDChange}
            required
          />
          <br />
          <br />
          <button type="submit">♦ Escrow</button>
        </div>
      </form>
      <div>
        <code>{accounts}</code>
      </div>
    </div>
  );
}
