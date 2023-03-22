const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

const MAX_NUM_SIGN = 200;
const MAX_NAME_LENGTH = 45;
const MAX_MSG_LENGTH = 260;

// In a real world scenario I would need to write many more tests.

describe("Token contract", function () {
  async function deployGuestbookFixture() {
    const Guestbook = await ethers.getContractFactory("Guestbook");
    const [addr1, addr2] = await ethers.getSigners();
    const hardhatGuestbook = await Guestbook.deploy(
      MAX_NUM_SIGN,
      MAX_NAME_LENGTH,
      MAX_MSG_LENGTH
    );

    await hardhatGuestbook.deployed();

    return { Guestbook, hardhatGuestbook, addr1, addr2 };
  }

  it("Deployment", async function () {
    const { hardhatGuestbook } = await loadFixture(deployGuestbookFixture);

    expect(await hardhatGuestbook.MAX_NUM_SIGN()).to.deep.equal(
      ethers.BigNumber.from(MAX_NUM_SIGN)
    );
    expect(await hardhatGuestbook.MAX_NAME_LENGTH()).to.deep.equal(
      ethers.BigNumber.from(MAX_NAME_LENGTH)
    );
    expect(await hardhatGuestbook.MAX_MSG_LENGTH()).to.deep.equal(
      ethers.BigNumber.from(MAX_MSG_LENGTH)
    );
    expect(await hardhatGuestbook.getHasUserSigned()).to.equal(false);
  });

  it("New signatures", async function () {
    const { hardhatGuestbook, addr1, addr2 } = await loadFixture(
      deployGuestbookFixture
    );

    await hardhatGuestbook
      .connect(addr1)
      .addSignature("Hello there!", "addr 1");
    await hardhatGuestbook
      .connect(addr2)
      .addSignature("Anothe message", "addr 2");

    expect(await hardhatGuestbook.numOfSign()).to.equal(2);
  });
});
