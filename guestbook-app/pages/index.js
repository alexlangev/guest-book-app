import { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SignaturesDisplay from "@/components/SignaturesDisplay/SignaturesDisplay";
import NewSignatureField from "@/components/NewSignatureField";
import SocialLink from "@/components/SocialLink";

// loading state?
// basic readonly
// modal to connect wallet
// -> close modal and dont connect and come back to read only state
// -> Connect metamask others? get signer? how handle the loading and stuff?

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [provider, setprovider] = useState(null);
  useEffect(() => {
    //connect something?
    // get provider for readonly state?
  }, []);

  return (
    <MaxWidthWrapper>
      <h1>Guestbook app</h1>
      <button>connect wallet</button>
      <p>Welcome to my guestbook app!</p>
      <p>
        You can read messages from previous visitors or write you own. All the
        data is stroed on a Smart contract on the Goerli testnet of the Ethereum
        blochain. To write a comment please connect your wallet.
      </p>
      <NewSignatureField />
      <SignaturesDisplay isLoading={isLoading} />
      <SocialLink />
    </MaxWidthWrapper>
  );
}

// #2ecfff	(46,207,255) blue
// #ffb641	(255,182,65) yellow new vegas
// #000000	(0,0,0) black
// #1bff80	(27,255,128) green HSL(147deg,100%,55.3%)
// #c0ffff	(192,255,255) light baby blue
