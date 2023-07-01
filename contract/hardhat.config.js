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
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
      gasLimit: 15000000,
    },
      mainnet: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
        gasLimit: 15000000,
      }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  }
};
