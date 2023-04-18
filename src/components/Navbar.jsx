import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [contract, setContract] = useState();
  const [provider, setProvider] = useState();

  const [gotAccount, setGotAccount] = useState();
  const [slicedAccount, setslicedAccount] = useState();
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      console.log("clicked");
      console.log(ethereum);
      // Checking if user have Metamask installed
      if (!ethereum) {
        // If user doesn't have Metamask installed, throw an error
        alert("Please install MetaMask");
        return;
      }

      // If user has Metamask installed, connect to the user's wallet
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setGotAccount(accounts);
      const acSl = accounts.slice(0, 10);
      setslicedAccount(acSl);
      // At last save the user's wallet address in browser's local storage
      localStorage.setItem("walletAddress", accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center  shadow-xl px-5 py-4 bg-[#241E42]">
        <div className="text-white font-bold">Logo</div>
        <div className="flex justify-evenly gap-5 text-white font-mono items-center">
          <div>Profile</div>
          <Link to="/participant_apply">
            <div>Hackathons</div>
          </Link>
          <div>
            {/* <button
              className="border border-white text-white bg-transparent font-mono py-2 px-4 rounded-full hover:bg-white hover:text-black"
              onClick={connectWallet}
            >
              {gotAccount && <h1>{gotAccount}</h1>}
              {!gotAccount && <h1>Connect Waller</h1>}
            </button> */}
            <ConnectButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
