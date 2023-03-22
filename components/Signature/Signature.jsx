import styles from "./Signature.module.css";

export default function Signature({ address, name, message, timestamp }) {
  const formatDate = (bigInt) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formatter.format(new Date(Number(bigInt) * 1000));
  };

  return (
    <li className={`${styles.wrapper}`}>
      <div className={`${styles.addressDateRow}`}>
        <div>{address}</div>
        <div>{formatDate(timestamp)}</div>
      </div>
      <div>{message}</div>
      <div className={`${styles.nameRow}`}>{name}</div>
    </li>
  );
}
