import { FC, FormEvent, useState } from "react";
import styles from "../styles/form.module.css";
import { v1 as uuidv1 } from "uuid";

const Form: FC<{ setTasks: (value: []) => void }> = ({ setTasks }: any) => {
  const [accountName, setAccountName] = useState("N/A");
  const [loginUrl, setLoginUrl] = useState("N/A");
  const [email, setEmail] = useState("N/A");
  const [username, setUsername] = useState("N/A");
  const [password, setPassword] = useState("N/A");
  const [description, setDescription] = useState("N/A");
  const [typeOf2FA, setTypeOf2FA] = useState("N/A");
  const [securityQuestion, setSecurityQuestion] = useState("N/A");
  const [securityAnswer, setSecurityAnswer] = useState("N/A");
  const [passwordExpiry, setPasswordExpiry] = useState("N/A");
  const [backupCodes, setBackupCodes] = useState("N/A");
  const [accountStatus, setAccountStatus] = useState("N/A");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTasks((tasks: []) => {
      const fullTask = {
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
      return [fullTask, ...tasks];
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
        />
      </div>

      <div className={styles.input_field}>
        <label>Login URL:</label>
        <input value={loginUrl} onChange={(e) => setLoginUrl(e.target.value)} />
      </div>

      <div className={styles.input_field}>
        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className={styles.input_field}>
        <label>Username:</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className={styles.input_field}>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.input_field}>
        <label>Type of 2FA:</label>
        <input
          value={typeOf2FA}
          onChange={(e) => setTypeOf2FA(e.target.value)}
        />
      </div>

      <div className={styles.input_field}>
        <label>Security Question:</label>
        <input
          value={securityQuestion}
          onChange={(e) => setSecurityQuestion(e.target.value)}
        />
      </div>

      <div className={styles.input_field}>
        <label>Security Answer:</label>
        <input
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
        />
      </div>

      <div className={styles.input_field}>
        <label>Password Expiry:</label>
        <input
          type="date"
          value={passwordExpiry}
          onChange={(e) => setPasswordExpiry(e.target.value)}
        />
      </div>

      <div className={styles.input_field}>
        <label>Backup Codes:</label>
        <textarea
          value={backupCodes}
          onChange={(e) => setBackupCodes(e.target.value)}
        />
      </div>

      <div className={styles.input_field}>
        <label>Account Status:</label>
        <input
          value={accountStatus}
          onChange={(e) => setAccountStatus(e.target.value)}
        />
      </div>

      <div id={styles.description_input}>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button type="submit">Save Account</button>
    </form>
  );
};

export default Form;
