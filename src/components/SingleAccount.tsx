import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Account } from "./AccountList";
import styles from "../styles/singleAccount.module.css";

const SingleAccount: FC<{ accounts: Account[] }> = ({ accounts }) => {
  const { accountId } = useParams<{ accountId: string }>();
  const [currentAccount, setCurrentAccount] = useState<Account>();
  useEffect(() => {
    setCurrentAccount(accounts.find((account) => account.id === accountId));
  }, [accountId, accounts]);
  return (
    <div className={styles.accountListItem}>
      {currentAccount ? (
        <div>
          <h2>{currentAccount.accountName}</h2>
          <p>
            <strong>Login URL:</strong> {currentAccount.loginUrl}
          </p>
          <p>
            <strong>Email:</strong> {currentAccount.email}
          </p>
          <p>
            <strong>Username:</strong> {currentAccount.username}
          </p>
          <p>
            <strong>Password:</strong> {currentAccount.password}
          </p>
          <p>
            <strong>Description:</strong> {currentAccount.description}
          </p>
          <p>
            <strong>Type of 2FA:</strong> {currentAccount.typeOf2FA}
          </p>
          <p>
            <strong>Security Question:</strong>{" "}
            {currentAccount.securityQuestion}
          </p>
          <p>
            <strong>Security Answer:</strong> {currentAccount.securityAnswer}
          </p>
          <p>
            <strong>Password Expiry:</strong> {currentAccount.passwordExpiry}
          </p>
          <p>
            <strong>Backup Codes:</strong> {currentAccount.backupCodes}
          </p>
          <p>
            <strong>Account Status:</strong> {currentAccount.accountStatus}
          </p>
        </div>
      ) : (
        <h2>No account found</h2>
      )}
    </div>
  );
};

export default SingleAccount;
