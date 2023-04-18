import React from "react";
import { getAllHackathons } from "@/pages/BlockchainServices";
const Hackathons = () => {
  const getAll = async () => {
    const izuku = await getAllHackathons();
    console.log(izuku);
  };
  return <div onClick={getAll}>Hackathons</div>;
};

export default Hackathons;
