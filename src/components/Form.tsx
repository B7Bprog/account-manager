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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAccounts((accounts: Account[]) => {
      const newAccount: Account = {
        id: uuidv1(),
        accountName: accountName,
        loginUrl: loginUrl,
        email: email,
        username: username,
        password: password,
        description: description,
        typeOf2FA: typeOf2FA,
        securityQuestion: securityQuestion,
        securityAnswer: securityAnswer,
        passwordExpiry: passwordExpiry,
        backupCodes: backupCodes,
        accountStatus: accountStatus,
      };
      return [newAccount, ...accounts];
    });
    setAccountName("N/A");
    setLoginUrl("N/A");
    setEmail("N/A");
    setUsername("N/A");
    setPassword("N/A");
    setDescription("N/A");
    setTypeOf2FA("N/A");
    setSecurityQuestion("N/A");
    setSecurityAnswer("N/A");
    setPasswordExpiry("N/A");
    setBackupCodes("N/A");
    setAccountStatus("N/A");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.input_field}>
        <label>Account Name:</label>
        <input
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="Enter account name"
        />
      </div>

      <div className={styles.input_field}>
        <label>Login URL:</label>
        <input
          value={loginUrl}
          onChange={(e) => setLoginUrl(e.target.value)}
          placeholder="Enter login URL"
        />
      </div>

      <div className={styles.input_field}>
        <label>Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
        />
      </div>

      <div className={styles.input_field}>
        <label>Username:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </div>

      <div className={styles.input_field}>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>

      <div className={styles.input_field}>
        <label>Type of 2FA:</label>
        <input
          value={typeOf2FA}
          onChange={(e) => setTypeOf2FA(e.target.value)}
          placeholder="Enter type of 2FA (e.g. SMS, App)"
        />
      </div>

      <div className={styles.input_field}>
        <label>Security Question:</label>
        <input
          value={securityQuestion}
          onChange={(e) => setSecurityQuestion(e.target.value)}
          placeholder="Enter security question"
        />
      </div>

      <div className={styles.input_field}>
        <label>Security Answer:</label>
        <input
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
          placeholder="Enter answer to security question"
        />
      </div>

      <div className={styles.input_field}>
        <label>Password Expiry:</label>
        <input
          type="date"
          value={passwordExpiry}
          onChange={(e) => setPasswordExpiry(e.target.value)}
          placeholder="Enter password expiry date"
        />
      </div>

      <div className={styles.input_field}>
        <label>Backup Codes:</label>
        <textarea
          value={backupCodes}
          onChange={(e) => setBackupCodes(e.target.value)}
          placeholder="Enter backup codes"
        />
      </div>

      <div className={styles.input_field}>
        <label>Account Status:</label>
        <input
          value={accountStatus}
          onChange={(e) => setAccountStatus(e.target.value)}
          placeholder="Enter account status (e.g. active, inactive)"
        />
      </div>

      <div id={styles.description_input}>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description for the account"
        />
      </div>

      <button type="submit">Save Account</button>
    </form>
  );
};

export default Form;
