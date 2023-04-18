import Head from "next/head";
import { useEffect, useState } from "react";
import { NFTStorage, File } from "nft.storage";
import NFT from "../abi/NFT.json";
import { ethers } from "ethers";
import config from "../abi/config.json";
export default function ProjectSubmission() {
  const [name, setName] = useState("");
  const [github, setGithub] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [url, setUrl] = useState("");
  const [nft, setNft] = useState(null);
  const [provider, setProvider] = useState(null);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    console.log(network);
    const networkID = config[network.chainId];

    console.log(networkID);
    const address = config[network.chainId].nft.address;

    console.log(address);
    //connecting to smart contract -address where it is deployed - abi file - provider from wallet
    const nft = new ethers.Contract(address, NFT, provider);

    setNft(nft);

    const name = await nft.name();

    console.log("name", name);
  };

  const uploadImage = async (stringData) => {
    alert("uploading data!");

    //create a instance to NFT.Storage
    const nftstorage = new NFTStorage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRlMzU1RjhBMjFkRTM5MTFBNjAzNjVkMTIwQTg2Y0IxNENmRkFGQkMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MDA2NDE2MzQ3MCwibmFtZSI6InRoaXJ1In0.NNgPh41wZ3k2qv4la1cdSriKtdAeplF_uLMl-jXRa-A",
    });

    const blob = new Blob([stringData], { type: "text/plain" });
    const file = new File([blob], "text.txt");

    // Send request to store image

    const { ipnft } = await nftstorage.store({
      image: blob,
      name: "thiru",
      description: "please",
    });

    // Save the URL

    const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;

    setUrl(url);

    return url;
  };

  const mintImage = async (tokenURI) => {
    alert("Waiting for Minting .....");

    const signer = await provider.getSigner(); //signing metams=ask screen open
    console.log(signer);
    //then metamask transaction screen opens to  send gas for minting
    //here we chain multiple functions
    const transaction = await nft
      .connect(signer, { gasLimit: 10000000 })
      .mint(tokenURI, { value: ethers.utils.parseUnits("1", "ether") });
    console.log(transaction);
    await transaction.wait();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle project submission here
    console.log(name, github, projectName, projectDescription, projectLink);

    const url = await uploadImage(name);
    console.log(url);

    await mintImage(url);

    console.log("success !");
  };
  useEffect(() => {
    loadBlockchainData();
  }, []);
  return (
    <div className="container mx-auto py-8">
      <Head>
        <title>Project Submission</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold mb-4">Submit Your Project</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Team Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="projectName"
          >
            Project Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="projectName"
            type="text"
            placeholder="My Awesome Project"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="projectDescription"
          >
            Project Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="projectDescription"
            placeholder="Describe your project"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="projectLink"
          >
            Project Link
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="projectLink"
            type="url"
            placeholder="https://myawesomeproject.com"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="projectLink"
          >
            Github Link
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="projectLink"
            type="url"
            placeholder="https:github.com/thirumurugan7"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
