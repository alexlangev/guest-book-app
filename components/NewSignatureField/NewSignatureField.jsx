import styles from "./NewSignatureField.module.css";
import { useState } from "react";

export default function NewSignatureField({
  hasSigned,
  submitSignature,
  maxLengthOfName,
  maxLengthOfMessage,
}) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [waitingConfirmation, setWaitingConfirmation] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmitSignature = () => {
    submitSignature(message, name);
  };

  return (
    !hasSigned && (
      <div className={`${styles.wrapper}`}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          className={`${styles.nameInput}`}
          disabled={waitingConfirmation}
          value={name}
          onChange={handleNameChange}
          maxLength={maxLengthOfName}
        ></input>
        <label htmlFor="msg">Message:</label>
        <textarea
          maxLength={maxLengthOfMessage}
          id="msg"
          className={`${styles.msgInput}`}
          disabled={waitingConfirmation}
          value={message}
          onChange={handleMessageChange}
        ></textarea>
        <button
          className={`${styles.submitButton}`}
          disabled={
            message.length === 0 || name.length === 0 || waitingConfirmation
          }
          onClick={handleSubmitSignature}
        >
          Submit
        </button>
      </div>
    )
  );
}
