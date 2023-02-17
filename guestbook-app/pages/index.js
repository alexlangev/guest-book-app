import Web3Modal, { getProviderInfo } from "web3modal";
import { ethers, providers, Contract } from "ethers";
import { GUESTBOOK_CONTRACT_ADDRESS, GUESTBOOK_CONTRACT_ABI } from "../utils/constants";
import { useEffect } from 'react';

export default function Home() {
  let provider;

  const connect = async() => {
    try {
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    connect();
  }, [])

  return (
    <>
      <h1>GuestBook</h1>
    </>
  )
}
