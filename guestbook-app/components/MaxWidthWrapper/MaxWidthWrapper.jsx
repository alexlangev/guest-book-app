import styles from "./MaxWidthWrapper.module.css";

const MaxWidthWrapper = ({ children }) => {
  return <div className={`${styles.maxWidthWrapper}`}>{children}</div>;
};

export default MaxWidthWrapper;
