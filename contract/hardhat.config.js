require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");

let ETHERSCAN_API="ZG8HYDPFRM2ME4TZVXC8QXYS3ZIYVR785S"
let ALCHEMY_MAINNET_API="DBafIhXNspbkZ1SQfKfStrX1qMh5gCq6"
let ALCHEMY_SEPOLIA_API="Jn5RGissfHwDWXDuwti5zQeVkDhPX8zE"

module.exports = 
{
  solidity: "0.8.17",
  networks: {
    sepolia: 
    {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_API}`,
      gasLimit: 2100000,
    },
      mainnet: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_MAINNET_API}`,
      }
  },
  etherscan: {
    apiKey: ETHERSCAN_API,
  }
};

