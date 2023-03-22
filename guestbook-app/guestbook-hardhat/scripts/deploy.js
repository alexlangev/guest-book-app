const { ethers } = require("hardhat");

const main = async () => {
  const guestbookContract = await ethers.getContractFactory("Guestbook");
  // arguments are uint8 _maxNumberOfSignatures, uint8 _maxLengthOfName, uint8 _maxLengthOfMessage
  const deployedGuestbook = await guestbookContract.deploy(50, 40, 240);

  await deployedGuestbook.deployed();

  console.log("Guestbook Contract Address:", deployedGuestbook.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
