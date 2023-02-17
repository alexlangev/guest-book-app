const hre = require("hardhat");

async function main() {
  const guestbookContract = await hre.ethers.getContractFactory("Guestbook");

  const deployedGuestbookContract = await guestbookContract.deploy(); 

  await deployedGuestbookContract.deployed();

  console.log({deployedGuestbookContract});
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
})