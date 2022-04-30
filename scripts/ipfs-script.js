const { NFTStorage, File } = require("nft.storage");
const fs = require("fs");

require("dotenv").config();
const { API_KEY } = process.env;

const client = new NFTStorage({ token: API_KEY });

const generateMetadata = async () => {
  const metadata = await client.store({
    name: "Blockchain NFT",
    description: "PEXELS DANIEL DAN IMAGE!",
    image: new File(
      [await fs.promises.readFile("./assets/pexels-daniel-dan-7708818.jpg")],
      "pexels-daniel-dan-7708818.jpg",
      { type: "image/jpg" }
    ),
  });
  console.log("Metadata ipnft: " + metadata.ipnft);
  return metadata.ipnft;
};

module.exports = {
  generateMetadata: generateMetadata,
};
