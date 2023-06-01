require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");


module.exports = 
{
  solidity: "0.8.17",
  networks: {
    sepolia: 
    {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_SEPOLIA_API}`,
    },
      mainnet: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_MAINNET_API}`,
      }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API,
  }
};