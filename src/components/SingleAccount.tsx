import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Account } from "./AccountList";
import styles from "../styles/singleAccount.module.css";
import CryptoJS from "crypto-js";

const SingleAccount: FC<{
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
}> = ({ accounts, setAccounts }) => {
  const { accountId } = useParams<{ accountId: string }>();
  const [currentAccount, setCurrentAccount] = useState<Partial<Account>>();
  const [deleteAllowed, setDeleteAllowed] = useState(false);
  const [deletePromptActive, setDeletePromptActive] = useState(false);

  const key = "mySecretPassword";
  const hashedKey = CryptoJS.SHA256(key).toString();

  const decryptAccountData = (account: Partial<Account>, key: string) => {
    console.log(account, "<<< account");
    console.log(hashedKey, "<<< hash for decrypt");

    console.log("Inside decrypt function");

    //Try to use deep copy here instead

    const decryptedAccount: Partial<Account> = JSON.parse(
      JSON.stringify(account)
    );

    console.log("decryptedAccount before loop", decryptedAccount);

    for (const [field, value] of Object.entries(account)) {
      if (
        typeof value === "string" &&
        field !== "id" &&
        field !== "accountName" &&
        value !== "N/A"
      ) {
        console.log(value, "<<< value here");
        console.log(typeof value, "<<< type of value here");
        if (field === "password") {
          console.log("inside decrypt if");

          const cleanValue = "U2FsdGVkX1/gUmQyHajt92IeIwVRgyU0tbSbXRQ/jNE=";
          //value.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
          // decryptedAccount[field as keyof Account] = CryptoJS.AES.decrypt(
          //   cleanValue,
          //   "hello"
          // ).toString(CryptoJS.enc.Utf8);
          const decryptedText = CryptoJS.AES.decrypt(
            cleanValue,
            hashedKey
          ).toString(CryptoJS.enc.Utf8);
          decryptedAccount[field as keyof Account] = decryptedText;
          //CryptoJS.enc.Utf8
          console.log("Decrypted text: ----->", decryptedText);
        }
      } else {
        decryptedAccount[field as keyof Account] = value;
      }
    }

    console.log(decryptedAccount, "<<<< decrypted account here");

    //setCurrentAccount(decryptedAccount);
    // return decryptAccountData;
  };

  useEffect(() => {
    setCurrentAccount(accounts.find((account) => account.id === accountId));
  }, [accountId, accounts]);

  useEffect(() => {
    console.log("Current account set here ", currentAccount);
  }, [currentAccount]);

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
          <p>
            <strong>Created At:</strong> {currentAccount.createdAt}
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
            <button
              onClick={() => {
                console.log(
                  "Current account when clicking before calling decrypt: ",
                  currentAccount
                );

                decryptAccountData(currentAccount, hashedKey);
              }}
            >
              Decrypt
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
