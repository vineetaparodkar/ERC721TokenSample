# Basic ERC721 token sample

This project demonstrates a basic ERC721 token sample. It comes with a sample contract, a sample script that deploys that contract and uses a NFT storage module & Pinata services for uploading metadata, and an example of a task implementation, which simply lists the available accounts.

## Setup

- Add metamask account secret key in `ERC721TOKENSAMPLE/.secret` file.

- Add Ropsten or Polygon RPC URL's, minter account address, IPFS API key in .env file.

- Compile Solidity ERC721 contract with below command

    ` npx hardhat compile`

- Deploy ERC721 smart contract with below command

    `node scripts/deploy.js`