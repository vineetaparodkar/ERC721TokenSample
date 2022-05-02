// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
require("dotenv").config();
const {
  pinMetadataPinataService,
  pinImagePinataService,
} = require("./PinataService");

const { MINTER_ACCOUNT } = process.env;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const templateMetadata = {
    name: "",
    description: "",
    image: "",
    attributes: [
      {
        trait_type: "blockchain", //level
        value: 100,
      },
      {
        trait_type: "Base", //properties
        value: "Starfish",
      },
      {
        trait_type: "Eyes", //properties
        value: "Big",
      },
      {
        trait_type: "Mouth", //properties
        value: "Surprised",
      },
      {
        trait_type: "Level", //level
        value: 5,
      },
      {
        trait_type: "Stamina", //level
        value: 1.4,
      },
      {
        trait_type: "Personality", //properties
        value: "Sad",
      },
      {
        display_type: "boost_number",//boost number
        trait_type: "Aqua Power",
        value: 40,
      },
      {
        display_type: "boost_percentage",//boost percentage
        trait_type: "Stamina Increase",
        value: 10,
      },
      {
        display_type: "number", //stats
        trait_type: "Generation",
        value: 2,
      },
    ],
  };

  // We get the contract to deploy
  const Erc721Token = await hre.ethers.getContractFactory("ERC721Token");
  const erc721Token = await Erc721Token.deploy(
    "ERC721Token",
    "ERC721",
    MINTER_ACCOUNT
  );

  await erc721Token.deployed();
  console.log("ERC721Token deployed to:", erc721Token.address);

  const imageIPFShash = await pinImagePinataService(
    "./assets/pexels-daniel-dan-7708818.jpg"
  );

  let metadata = { ...templateMetadata };
  metadata.name = "Blockchain NFT";
  metadata.description = "PEXELS DANIEL DAN IMAGE!";
  metadata.image = `https://gateway.pinata.cloud/ipfs/${imageIPFShash}`;

  const metadataUploadResponse = await pinMetadataPinataService(metadata);

  const uri = `https://gateway.pinata.cloud/ipfs/${metadataUploadResponse}`;
  const mintTokenTx = await erc721Token.safeMint(MINTER_ACCOUNT, uri);
  mintTokenTx.wait();
  console.log("Token Minted successfully:");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
