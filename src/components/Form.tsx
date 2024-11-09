import { FC, FormEvent, useContext, useState } from "react";
import styles from "../styles/form.module.css";
import { v1 as uuidv1 } from "uuid";
import { Account } from "./AccountList";
import CryptoJS from "crypto-js";
import { ConfigContext } from "../contexts/ConfigContext";

const Form: FC<{
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
}> = ({ setAccounts }) => {
  const [accountName, setAccountName] = useState("");
  const [loginUrl, setLoginUrl] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [typeOf2FA, setTypeOf2FA] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [passwordExpiry, setPasswordExpiry] = useState("");
  const [backupCodes, setBackupCodes] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [newAccountAdded, setNewAccountAdded] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pwPromptActive, setPwPromptActive] = useState(false);
  const [pwMessage, setPwMessage] = useState("");
  const [input, setInput] = useState("");
  const [wrongPwMessage, setWrongPwMessage] = useState("");
  const configContext = useContext(ConfigContext);
  const [isPwInputDisabled, setIsPwInputDisabled] = useState(false);

  const resetFormFields = () => {
    setAccountName("");
    setLoginUrl("");
    setEmail("");
    setUsername("");
    setPassword("");
    setDescription("");
    setTypeOf2FA("");
    setSecurityQuestion("");
    setSecurityAnswer("");
    setPasswordExpiry("");
    setBackupCodes("");
    setAccountStatus("");
    setCreatedAt("");
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (accountName === "") {
      setMessage("Account name cannot be empty!");
      setTimeout(() => {
        setMessage("");
      }, 3500);
    } else {
      if (!pwPromptActive) {
        setPwMessage("Enter Password:");
      }
    }
  };

  function encryptAccountData(account: Account, key: string): Partial<Account> {
    const encryptedAccount: Partial<Account> = {};

    for (const [field, value] of Object.entries(account)) {
      if (
        typeof value === "string" &&
        field !== "id" &&
        field !== "accountName" &&
        field !== "createdAt" &&
        value !== "N/A"
      ) {
        encryptedAccount[field as keyof Account] = CryptoJS.AES.encrypt(
          value,
          key
        ).toString();
      } else {
        encryptedAccount[field as keyof Account] = value;
      }
    }

    return encryptedAccount;
  }

  const handleInputClick = () => {
    // setPwHash(CryptoJS.SHA256(input).toString());

    const hashedInput = CryptoJS.SHA256(input).toString();

    // setPwHash(hashedInput);
    if (configContext) {
      if (configContext.config.mk === hashedInput) {
        try {
          setAccounts((accounts: Account[]) => {
            const encryptedAccount = encryptAccountData(
              {
                id: uuidv1(),
                accountName: accountName || "N/A",
                loginUrl: loginUrl || "N/A",
                email: email || "N/A",
                username: username || "N/A",
                password: password || "N/A",
                description: description || "N/A",
                typeOf2FA: typeOf2FA || "N/A",
                securityQuestion: securityQuestion || "N/A",
                securityAnswer: securityAnswer || "N/A",
                passwordExpiry: passwordExpiry || "N/A",
                backupCodes: backupCodes || "N/A",
                accountStatus: accountStatus || "N/A",
                createdAt: formattedDate,
              },
              input
            );

            const newAccount: Account = {
              // ...encryptedAccount,
              id: uuidv1(),
              accountName: encryptedAccount.accountName || "N/A",
              loginUrl: encryptedAccount.loginUrl || "N/A",
              email: encryptedAccount.email || "N/A",
              username: encryptedAccount.username || "N/A",
              password: encryptedAccount.password || "N/A",
              description: encryptedAccount.description || "N/A",
              typeOf2FA: encryptedAccount.typeOf2FA || "N/A",
              securityQuestion: encryptedAccount.securityQuestion || "N/A",
              securityAnswer: encryptedAccount.securityAnswer || "N/A",
              passwordExpiry: encryptedAccount.passwordExpiry || "N/A",
              backupCodes: encryptedAccount.backupCodes || "N/A",
              accountStatus: encryptedAccount.accountStatus || "N/A",
              createdAt: encryptedAccount.createdAt || "N/A",
            };
            setInput("");
            return [newAccount, ...accounts];
          });
          setNewAccountAdded(true);
          setTimeout(() => {
            setNewAccountAdded(false);
            resetFormFields();
          }, 2500);
          setPwMessage("");
          setPwPromptActive(false);
        } catch {
          setNewAccountAdded(false);
          setError("Something wen't wrong! Account NOT saved.");
        }
      } else {
        setInput("");
        setIsPwInputDisabled(true);
        setWrongPwMessage("Wrong password! Try again in 5 seconds...");
        setTimeout(() => {
          setWrongPwMessage("");
          setIsPwInputDisabled(false);
        }, 5000);
      }
    }
  };

  if (newAccountAdded) {
    return <h2>Account has been saved</h2>;
  }
  /////////////////// Master Password input ///////////////////
  if (pwMessage) {
    return (
      <div>
        <h2>{pwMessage}</h2>
        <input
          value={input}
          disabled={isPwInputDisabled}
          type="password"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleInputClick();
          }}
        ></input>
        <button
          disabled={isPwInputDisabled}
          onClick={() => {
            handleInputClick();
          }}
        >
          Enter
        </button>
        {wrongPwMessage ? <h2>{wrongPwMessage}</h2> : null}
      </div>
    );
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div id={styles.account_form}>
        <div className={styles.input_wrapper}>
          <label>Account Name: *</label>
          <input
            value={accountName}
            maxLength={80}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Enter account name [mandatory]"
          />
        </div>

        <div className={styles.input_wrapper}>
          <label>Login URL:</label>
          <input
            value={loginUrl}
            maxLength={2000}
            onChange={(e) => setLoginUrl(e.target.value)}
            placeholder="Enter login URL"
          />
        </div>

        <div className={styles.input_wrapper}>
          <label>Email:</label>
          <input
            value={email}
            maxLength={80}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
        </div>

        <div className={styles.input_wrapper}>
          <label>Username:</label>
          <input
            value={username}
            maxLength={80}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div className={styles.input_wrapper}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            maxLength={80}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <div className={styles.input_wrapper}>
          <label>Type of 2FA:</label>
          <input
            value={typeOf2FA}
            maxLength={80}
            onChange={(e) => setTypeOf2FA(e.target.value)}
            placeholder="Enter type of 2FA (e.g. SMS, App)"
          />
        </div>

        <div className={styles.input_wrapper}>
          <label>Security Question:</label>
          <textarea
            value={securityQuestion}
            maxLength={1000}
            onChange={(e) => setSecurityQuestion(e.target.value)}
            placeholder="Enter security question"
          />
        </div>

        <div className={styles.input_wrapper}>
          <label>Security Answer:</label>
          <textarea
            value={securityAnswer}
            maxLength={1000}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            placeholder="Enter answer to security question"
          />
        </div>

        <div className={styles.input_wrapper}>
          <label>Password Expiry:</label>
          <input
            type="date"
            value={passwordExpiry}
            maxLength={80}
            onChange={(e) => setPasswordExpiry(e.target.value)}
            placeholder="Enter password expiry date"
          />
        </div>

        <div className={styles.input_wrapper}>
          <label>Backup Codes:</label>
          <textarea
            value={backupCodes}
            maxLength={1000}
            onChange={(e) => setBackupCodes(e.target.value)}
            placeholder="Enter backup codes"
          />
        </div>

        <div className={styles.input_wrapper}>
          <label>Account Status:</label>
          <input
            value={accountStatus}
            maxLength={80}
            onChange={(e) => setAccountStatus(e.target.value)}
            placeholder="Enter account status (e.g. active, inactive)"
          />
        </div>
      </div>
      <div id={styles.description_wrapper}>
        <label>Description:</label>
        <textarea
          id={styles.description_text_area}
          value={description}
          maxLength={5000}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description for the account"
        />
      </div>
      <div id={styles.save_button}>
        <button type="submit">Save Account</button>
        <h2 id={styles.message}>{message}</h2>
      </div>
    </form>
  );
};

export default Form;
