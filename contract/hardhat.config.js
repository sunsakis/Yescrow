require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHEREUM_ETHERSCAN_API_KEY,
    },
  },
};
