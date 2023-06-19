const hre = require("hardhat");
const { LedgerSigner } = require("@anders-t/ethers-ledger");  

async function main () {
  
  const ledger = new LedgerSigner(hre.ethers.provider);                                                                                                                              
  const Escrow = await hre.ethers.getContractFactory('Escrow');
  console.log('Deploying Escrow...');
  let contractFactory = Escrow.connect(ledger);
  const escrow = await contractFactory.deploy();
  await escrow.deployed();
  console.log('Escrow deployed to:', escrow.address);
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

// DEPLOYMENT WITHOUT LEDGER
// const { ethers } = require("hardhat");

// async function main() {
//   const ContractFactory = await ethers.getContractFactory("Escrow");
//   console.log(`🏗  Get Escrow contract factory`);

//   const contractInstance = await ContractFactory.deploy();
//   console.log(`⏳ Initiate Escrow contract deployment`);

//   await contractInstance.deployed();
//   console.log(
//     `✅ Escrow deployed to: ${contractInstance.address}\n`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
