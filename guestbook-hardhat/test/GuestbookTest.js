const { ethers } = require("hardhat");
const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

const MAX_NUM_SIGN = 200;
const MAX_LENGTH_NAME = 200;
const MAX_LENGTH_MESSAGE = 200;

describe("Guestbook contract", function () {
  async function deployGuestbookFixture() {
    const Guestbook = await ethers.getContractFactory("Guestbook");
    // Get default provider and signers
    const defaultProvider = await ethers.getDefaultProvider();
    const [addr1, addr2] = await ethers.getSigners();

    const hardhatGuestbook = await Guestbook.deploy(
      MAX_NUM_SIGN,
      MAX_LENGTH_NAME,
      MAX_LENGTH_MESSAGE
    );
    await hardhatGuestbook.deployed();

    return { Guestbook, hardhatGuestbook, defaultProvider, addr1, addr2 };
  }

  // Test for the correct inital values of maxNumberOfSignatures and numberOfSignatures.
  describe("Deployment", function () {
    it("Initial values", async function () {
      const { hardhatGuestbook } = await loadFixture(deployGuestbookFixture);

      expect(await hardhatGuestbook.numberOfSignatures()).to.equal(0);
      expect(await hardhatGuestbook.maxNumberOfSignatures()).to.equal(
        MAX_NUM_SIGN
      );
      expect(await hardhatGuestbook.maxLengthOfName()).to.equal(
        MAX_LENGTH_NAME
      );
      expect(await hardhatGuestbook.maxLengthOfMessage()).to.equal(
        MAX_LENGTH_MESSAGE
      );
    });
  });
});
