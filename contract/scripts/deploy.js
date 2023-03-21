const { ethers } = require("hardhat");

async function main() {
  const ContractFactory = await ethers.getContractFactory("Escrow");
  console.log(`🏗  Get Escrow contract factory`);

  const contractInstance = await ContractFactory.deploy();
  console.log(`⏳ Initiate Escrow contract deployment`);

  await contractInstance.deployed();
  console.log(
    `✅ Escrow deployed to: ${contractInstance.address}\n`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
