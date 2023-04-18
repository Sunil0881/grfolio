import Web3 from "web3";
// import Supply from "./abi/Supplychain.json";
// import Mint from "./abi/Mint.json";
// import Fund from "./abi/Fund.json";
// import Certificate from "./abi/Certificate.json";
// import Posts from "./abi/Post.json";
import { ethers } from "ethers";
import devfolio from "./abi/devfolio.json";
const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
const { ethereum } = isBrowser();
if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}

// Define Contracts address

const CONTRACT_ADDRESS = "0x58cf5B5581042b4e07d5496d472D2aaf5ca724b1";

const CreateHackathon = async ({
  name,
  tagline,
  theme,
  max_players,
  app_open,
  app_close,
  venue,
  email,
  phone_number,
}) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(CONTRACT_ADDRESS, devfolio, signer);
  const tokenid = await Role.createHackathon(
    name,
    tagline,

    max_players,
    theme,
    app_open,
    app_close
  );
  console.log(tokenid);
};

const getAllHackathons = async () => {
  let provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log(provider);
  const signer = provider.getSigner();
  console.log(signer);
  const Role = new ethers.Contract(CONTRACT_ADDRESS, devfolio, signer);
  console.log(Role);
  const tokenId = await Role.getAllHackathons();
  console.log(tokenId);
};

export { CreateHackathon, getAllHackathons };
