import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Account } from "./AccountList";
import styles from "../styles/singleAccount.module.css";

const SingleAccount: FC<{
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
}> = ({ accounts, setAccounts }) => {
  const { accountId } = useParams<{ accountId: string }>();
  const [currentAccount, setCurrentAccount] = useState<Account>();
  useEffect(() => {
    setCurrentAccount(accounts.find((account) => account.id === accountId));
  }, [accountId, accounts]);

  const handleDelete = () => {
    setAccounts((accounts: Account[]) => {
      return accounts.filter((account) => {
        return account.id !== accountId;
      });
    });
  };
  return (
    <div className={styles.accountListItem}>
      {currentAccount ? (
        <div>
          <div className={styles.single_account_title}>
            <h2>{currentAccount.accountName}</h2>
          </div>
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
            <strong>Password Expiry:</strong> {currentAccount.passwordExpiry}
          </p>
          <p>
            <strong>Type of 2FA:</strong> {currentAccount.typeOf2FA}
          </p>

          <p>
            <strong>Account Status:</strong> {currentAccount.accountStatus}
          </p>

          <div className={styles.description_wrapper}>
            <p>
              <strong>Description:</strong>
            </p>
            <div className={styles.description_box}>
              <p>{currentAccount.description}</p>
            </div>
          </div>

          <div className={styles.security_wrapper}>
            <p>
              <strong>Security Question:</strong>
            </p>
            <div className={styles.security_box}>
              <p>{currentAccount.securityQuestion}</p>
            </div>
          </div>
          <div className={styles.security_answer_wrapper}>
            <p>
              <strong>Security Answer:</strong>
            </p>

            <div className={styles.security_answer_box}>
              <p>{currentAccount.securityAnswer}</p>
            </div>
          </div>

          <div className={styles.backup_codes_wrapper}>
            <p>
              <strong>Backup Codes:</strong>
            </p>
            <div className={styles.backup_codes_box}>
              <p>{currentAccount.backupCodes}</p>
            </div>
          </div>
          <div id={styles.delete_button_wrapper}>
            <button id={styles.delete_account_button} onClick={handleDelete}>
              Delete account
            </button>
          </div>
        </div>
      ) : (
        <h2>Account does not exist</h2>
      )}
    </div>
  );
};

export default SingleAccount;
