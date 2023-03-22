import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { useEffect, useState, useRef } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SignaturesDisplay from "@/components/SignaturesDisplay/SignaturesDisplay";
import NewSignatureField from "@/components/NewSignatureField";
import { GUESTBOOK_CONTRACT_ADDRESS, ABI } from "@/utils/constants";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [maxLengthOfName, setMaxLengthOfName] = useState(null);
  const [maxLengthOfMessage, setMaxLengthOfMessage] = useState(null);
  const [maxNumOfSignatures, setMaxNumOfSignatures] = useState(null);
  const [guestbookSignatures, setGuestbookSignatures] = useState([]);
  const [userHasSigned, setUserHasSigned] = useState(false);
  const web3ModalRef = useRef();
  console.log("test", guestbookSignatures.length);
  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const getGuestbookData = async () => {
    try {
      const provider = await getProviderOrSigner();
      const guestbookContract = new Contract(
        GUESTBOOK_CONTRACT_ADDRESS,
        ABI,
        provider
      );
      const guestbookSignatures = await guestbookContract.getAllSignatures();
      const guestbookMaxSignatures = await guestbookContract.MAX_NUM_SIGN();
      const guestbookMaxMessageLength =
        await guestbookContract.MAX_MSG_LENGTH();
      const guestbookMaxNameLength = await guestbookContract.MAX_NAME_LENGTH();

      setGuestbookSignatures(guestbookSignatures);
      setMaxNumOfSignatures(guestbookMaxSignatures);
      setMaxLengthOfName(guestbookMaxNameLength);
      setMaxLengthOfMessage(guestbookMaxMessageLength);
    } catch (err) {
      console.log(err);
    }
  };

  const submitSignature = async (newMessage, newName) => {
    try {
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();

      const guestlistContract = new Contract(
        GUESTBOOK_CONTRACT_ADDRESS,
        ABI,
        signer
      );
      const tx = await guestlistContract.addSignature(newMessage, newName);
      setWaitingConfirmation(true);
      await tx.wait();
      setWaitingConfirmation(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getHasUserSigned = async () => {
    try {
      const provider = await getProviderOrSigner();
      const guestbookContract = new Contract(
        GUESTBOOK_CONTRACT_ADDRESS,
        ABI,
        provider
      );
      const userHasSigned = await guestbookContract.getHasUserSigned();
      setUserHasSigned(userHasSigned);
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      getHasUserSigned();
      getGuestbookData();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <MaxWidthWrapper>
      <h1>Guestbook app</h1>
      <p>
        The following messages visible underneath are saved on the Ethereum
        blockchain (Goerli testnet). Each address can publish a single message.
        You can publish your own message with a metamask wallet and a few
        GoerliETH.
      </p>

      <NewSignatureField
        maxLengthOfName={maxLengthOfName}
        maxLengthOfMessage={maxLengthOfMessage}
        submitSignature={submitSignature}
        hasSigned={userHasSigned}
      />
      <SignaturesDisplay guestbookSignatures={guestbookSignatures} />
      <div>{`${
        Number(maxNumOfSignatures) - guestbookSignatures.length
      } signatures left`}</div>
    </MaxWidthWrapper>
  );
}
