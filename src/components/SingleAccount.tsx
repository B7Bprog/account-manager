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
  const [deleteAllowed, setDeleteAllowed] = useState(false);
  const [deletePromptActive, setDeletePromptActive] = useState(false);

  useEffect(() => {
    setCurrentAccount(accounts.find((account) => account.id === accountId));
  }, [accountId, accounts]);

  const handleDeleteButtonPress = () => {
    if (!deleteAllowed) {
      setDeletePromptActive(true);
    }
  };

  const handleDelete = () => {
    setDeletePromptActive(false);
    setAccounts((accounts: Account[]) => {
      return accounts.filter((account) => {
        return account.id !== accountId;
      });
    });
  };

  if (deletePromptActive) {
    return (
      <div className={styles.delete_prompt_wrapper}>
        <h2 className={styles.prompt_message}>
          Are you sure you want to delete the following account?
        </h2>
        <h2>{currentAccount?.accountName}</h2>
        <div className={styles.button_wrapper}>
          <button onClick={() => setDeletePromptActive(false)}>No</button>
          <button id={styles.final_delete_button} onClick={handleDelete}>
            Yes
          </button>
        </div>
      </div>
    );
  }

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
            <button
              id={styles.delete_account_button}
              onClick={handleDeleteButtonPress}
            >
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
