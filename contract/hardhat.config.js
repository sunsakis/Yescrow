require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [ETH_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHEREUM_ETHERSCAN_API_KEY,
    },
  },
};
