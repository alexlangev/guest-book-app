// import Chai to use asserting functions.
const { expect } = require("chai");
// loadfixtures is for sharing common setups (or fixtures) between tests.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Guestbook contract", function () {
  // Define a fixture to reuse the same setup in every test.
  async function deployGuestbookFixture() {
    // get the Contract factory, signers and providers here
    const Guestbook = await ethers.getContractFactory("Guestbook");
    const [addr1] = await ethers.getSigners();

    const hardhatGuestbook = await Guestbook.deploy();
    await hardhatGuestbook.deployed();

    // fixtures can return anything useful
    return { Guestbook, hardhatGuestbook, addr1 };
  }
});
