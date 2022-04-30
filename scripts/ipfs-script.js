const { NFTStorage, File } = require("nft.storage");
const fs = require("fs");
const mime = require("mime")
const path = require("path")


require("dotenv").config();
const { API_KEY } = process.env;
const client = new NFTStorage({ token: API_KEY });

const fileFromPath = async (filePath) => {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  return new File([content], path.basename(filePath), { type });
};

const generateMetadata = async () => {
  const image = await fileFromPath("./assets/pexels-daniel-dan-7708818.jpg");
  const name = "Blockchain NFT";
  const description = "PEXELS DANIEL DAN IMAGE!";

  const metadata = await client.store({
    name,
    description,
    image,
  });

  console.log("Metadata ipnft: " + metadata.ipnft);
  return metadata.ipnft;
};

module.exports = {
  generateMetadata: generateMetadata,
};
