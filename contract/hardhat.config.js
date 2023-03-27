require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`,
    },
      mainnet: {
        url: `https://eth-mainnet.g.alchemy.com/v2/DBafIhXNspbkZ1SQfKfStrX1qMh5gCq6`,
        //accounts: [process.env.REACT_APP_MAINNET_PRIVATE_KEY]
      }
  }
};