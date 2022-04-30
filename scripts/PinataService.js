const pinataSDK = require("@pinata/sdk");
const fs = require("fs");

require("dotenv").config();
const pinataAPIKey = process.env.PINATA_API_KEY || "";
const pinataSecret = process.env.PINATA_SECRET || "";
const pinata = pinataSDK(pinataAPIKey, pinataSecret);

const pinImagePinataService = async (location) => {
  try {
    const response = await pinata.pinFromFS(location);
    console.log("pin image pinata service response:  ", response);
    return response.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};

const pinMetadataPinataService = async (metadata) => {
  const options = {
    pinataMetadata: {
      name: "metadata.json",
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };
  try {
    const response = await pinata.pinJSONToIPFS(metadata, options);
    console.log("pin metadata pinata service response:  ", response);
    return response.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  pinMetadataPinataService: pinMetadataPinataService,
  pinImagePinataService: pinImagePinataService,
};
