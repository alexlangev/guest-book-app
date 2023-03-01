import styles from "./SignaturesDisplay.module.css";

export default function SignaturesDisplay({ isLoading }) {
  const TEMP_MSG_ARR = [
    [
      "0xb794f5ea0ba39494ce839613fffba74279579268",
      "Alex L",
      "This is a cool idea for a dapp This is a cool idea for a dapp This is a cool idea for a dapp This is a cool idea for a dapp",
      "27-11-2020",
    ],
    [
      "604f5ea0ba39494xb79ce83961a742795793ffb28f",
      "Mom",
      "Hello son!",
      "01-12-2021",
    ],
    [
      "579260xb794f5eace839613fffba0ba39494742798",
      "Joey D",
      "Hi there! This is a cool idea for a dapp This is a cool idea for a dapp",
      "24-09-2022",
    ],
  ];

  // return the first 10 characters of the users public address and append "...".
  const maskAddress = (address) => {
    const maskedAddress = `${address.substr(0, 9)}...`;
    return maskedAddress;
  };

  return (
    <>
      {isLoading && <div>Shit is loading</div>}
      {!isLoading && (
        <ul className={`${styles.signatureList}`}>
          {TEMP_MSG_ARR.map((signature) => {
            return (
              <li
                className={`${styles.signatureItem}`}
                key={maskAddress(signature[0])}
              >
                <div className={`${styles.nameRow}`}>
                  <span>{signature[1]}</span>
                </div>
                <div>
                  <p className={`${styles.message}`}>{signature[2]}</p>
                </div>
                <p className={`${styles.signatureDateRow}`}>
                  {`Signed by ${maskAddress(signature[0])} on ${signature[3]}`}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
