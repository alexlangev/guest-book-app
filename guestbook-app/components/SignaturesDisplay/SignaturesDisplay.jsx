import styles from "./SignaturesDisplay.module.css";
import Signature from "@/components/Signature";

export default function SignaturesDisplay({ guestbookSignatures }) {
  // return the first 10 characters of the users public address and append "...".
  const maskAddress = (address) => {
    const addressLength = address.length;
    const maskedAddress = `${address.substr(0, 4)}...${address.substr(
      addressLength - 4,
      addressLength
    )}`;
    return maskedAddress;
  };

  return (
    <>
      {
        <ul className={`${styles.signatureList}`}>
          {guestbookSignatures.map((signature) => {
            return (
              <Signature
                key={maskAddress(signature.addr)}
                address={maskAddress(signature.addr)}
                name={signature.name}
                message={signature.message}
                timestamp={signature.timestamp}
              />
            );
          })}
        </ul>
      }
    </>
  );
}
