import { FC, FormEvent, useState } from "react";
import styles from "../styles/form.module.css";
import { v1 as uuidv1 } from "uuid";
import { Account } from "./AccountList";

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

  const [newAccountAdded, setNewAccountAdded] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (accountName === "") {
      setMessage("Account name cannot be empty!");
      setTimeout(() => {
        setMessage("");
      }, 3500);
    } else {
      try {
        setAccounts((accounts: Account[]) => {
          const newAccount: Account = {
            id: uuidv1(),
            accountName: accountName ? accountName : "N/A",
            loginUrl: loginUrl ? loginUrl : "N/A",
            email: email ? email : "N/A",
            username: username ? username : "N/A",
            password: password ? password : "N/A",
            description: description ? description : "N/A",
            typeOf2FA: typeOf2FA ? typeOf2FA : "N/A",
            securityQuestion: securityQuestion ? securityQuestion : "N/A",
            securityAnswer: securityAnswer ? securityAnswer : "N/A",
            passwordExpiry: passwordExpiry ? passwordExpiry : "N/A",
            backupCodes: backupCodes ? backupCodes : "N/A",
            accountStatus: accountStatus ? accountStatus : "N/A",
          };
          return [newAccount, ...accounts];
        });
        setNewAccountAdded(true);
        setTimeout(() => {
          setNewAccountAdded(false);
          resetFormFields();
        }, 2500);
      } catch {
        setNewAccountAdded(false);
        setError("Something wen't wrong! Account NOT saved.");
      }
    }
  };

  if (newAccountAdded) {
    return <h2>Account has been saved</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div id={styles.account_form}>
        <div className={styles.input_wrapper}>
          <label>Account Name:</label>
          <input
            value={accountName}
            maxLength={80}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Enter account name"
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
