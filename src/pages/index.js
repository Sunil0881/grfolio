import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import OrganiserForm from "@/components/OrganiserForm";

const inter = Inter({ subsets: ["latin"] });

// const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
// const { ethereum } = isBrowser();
// if (ethereum) {
//   isBrowser().web3 = new Web3(ethereum);
//   isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
// }

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <OrganiserForm />
    </main>
  );
}
