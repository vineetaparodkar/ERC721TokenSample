const { expect } = require("chai");
const { ethers } = require("hardhat");
require("dotenv").config();
const { MINTER_ACCOUNT,TOKEN_URI } = process.env;

describe("ERC721Token", function () {
  it("ERC721Token mint test", async function () {
    const ERC721Token = await ethers.getContractFactory("ERC721Token");
    const erc721Token = await ERC721Token.deploy(
      "TestToken",
      "TOKEN",
      MINTER_ACCOUNT
    );
    await erc721Token.deployed();
    const mintTx = await erc721Token.safeMint(MINTER_ACCOUNT,TOKEN_URI);
    // wait until the transaction is mined
    await mintTx.wait();
  });
});
