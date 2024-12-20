import { FC, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Account } from "./AccountList";
import styles from "../styles/singleAccount.module.css";
import CryptoJS from "crypto-js";
import { ConfigContext } from "../contexts/ConfigContext";

const SingleAccount: FC<{
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
}> = ({ accounts, setAccounts }) => {
  const { accountId } = useParams<{ accountId: string }>();
  const [currentAccount, setCurrentAccount] = useState<Partial<Account>>();
  const [deleteAllowed, setDeleteAllowed] = useState(false);
  const [deletePromptActive, setDeletePromptActive] = useState(false);
  const [decrypted, setDecrypted] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");
  const [configFileContent, setConfigFileContent] = useState({
    theme: "",
    mk: "",
  });
  const [askMasterPw, setAskMasterPw] = useState(false);
  const [wrongPwMessage, setWrongPwMessage] = useState("");
  const [isPwInputDisabled, setIsPwInputDisabled] = useState(false);
  const configContext = useContext(ConfigContext);

  //////////////////////// Scroll to top ////////////////////////////////////////

  useEffect(() => {
    const container = document.querySelector(`.${styles.accountListItem}`);
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [accountId]);

  ///////////////////////// Load Config ////////////////////////////////////////

  useEffect(() => {
    window.ipcRenderer.send("loadConfig");

    window.ipcRenderer.on("loadConfigResponse", (_event, data) => {
      setConfigFileContent(JSON.parse(data));
    });

    return () => {
      window.ipcRenderer.removeAllListeners("loadAccountsResponse");
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setDecrypted(false);
  }, [accountId]);

  ////////////////////////// Decrypt Account ///////////////////////////////////

  const decryptAccountData = (account: Partial<Account>, key: string) => {
    //Try to use deep copy here instead

    const decryptedAccount: Partial<Account> = JSON.parse(
      JSON.stringify(account)
    );

    for (const [field, value] of Object.entries(account)) {
      if (
        typeof value === "string" &&
        field !== "id" &&
        field !== "accountName" &&
        field !== "createdAt" &&
        value !== "N/A"
      ) {
        const cleanValue = value;
        const decryptedText = CryptoJS.AES.decrypt(cleanValue, key).toString(
          CryptoJS.enc.Utf8
        );
        decryptedAccount[field as keyof Account] = decryptedText;
      } else {
        decryptedAccount[field as keyof Account] = value;
      }
    }

    setDecrypted(true);
    setCurrentAccount(decryptedAccount);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setCurrentAccount(accounts.find((account) => account.id === accountId));
  }, [accountId, accounts]);

  ///////////////////////// Handle Delete Account //////////////////////////////////////////

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
  /////////////////////// Handle Master Password /////////////////////////////////////////
  const handleMasterPasswordClick = () => {
    const masterPasswordHash = CryptoJS.SHA256(masterPassword).toString();

    if (masterPasswordHash === configFileContent.mk) {
      decryptAccountData(currentAccount!, masterPassword);
      setAskMasterPw(false);
      setMasterPassword("");
    } else {
      setMasterPassword("");
      setIsPwInputDisabled(true);
      setWrongPwMessage("Wrong password! Try again in 5 seconds...");
      setTimeout(() => {
        setWrongPwMessage("");
        setIsPwInputDisabled(false);
      }, 5000);
    }
  };
  ///////////////////////////////////// RETURNS //////////////////////////////////////////
  if (askMasterPw) {
    return (
      <div>
        <h2>Enter Master Password:</h2>
        <input
          disabled={isPwInputDisabled}
          value={masterPassword}
          type="password"
          onChange={(e) => setMasterPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleMasterPasswordClick();
          }}
        ></input>
        <button
          disabled={isPwInputDisabled}
          onClick={() => {
            handleMasterPasswordClick();
          }}
        >
          Enter
        </button>
        {wrongPwMessage ? <h2>{wrongPwMessage}</h2> : null}
      </div>
    );
  }

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
            <h2 id={styles.titleTag}>{currentAccount.accountName}</h2>{" "}
            <button
              id={styles.decryptButton}
              disabled={decrypted ? true : false}
              onClick={() => {
                setAskMasterPw(true);
              }}
            >
              Decrypt
            </button>
          </div>
          <p>
            <strong>Login URL:</strong>
            {/U2F.*/.test(currentAccount.loginUrl!)
              ? "Encrypted..."
              : currentAccount.loginUrl}
          </p>
          <p>
            <strong>Email:</strong>
            {/U2F.*/.test(currentAccount.email!)
              ? "Encrypted..."
              : currentAccount.email}
          </p>
          <p>
            <strong>Username:</strong>
            {/U2F.*/.test(currentAccount.username!)
              ? "Encrypted..."
              : currentAccount.username}
          </p>
          <p>
            <strong>Password:</strong>
            {/U2F.*/.test(currentAccount.password!)
              ? "Encrypted..."
              : currentAccount.password}
          </p>
          <p>
            <strong>Password Expiry:</strong>
            {/U2F.*/.test(currentAccount.passwordExpiry!)
              ? "Encrypted..."
              : currentAccount.passwordExpiry}
          </p>
          <p>
            <strong>Type of 2FA:</strong>
            {/U2F.*/.test(currentAccount.typeOf2FA!)
              ? "Encrypted..."
              : currentAccount.typeOf2FA}
          </p>
          <p>
            <strong>Account Status:</strong>
            {/U2F.*/.test(currentAccount.accountStatus!)
              ? "Encrypted..."
              : currentAccount.accountStatus}
          </p>
          <p>
            <strong>Created At:</strong>
            {/U2F.*/.test(currentAccount.createdAt!)
              ? "Encrypted..."
              : currentAccount.createdAt}
          </p>

          <div className={styles.description_wrapper}>
            <p>
              <strong>Description:</strong>
            </p>
            <div className={styles.description_box}>
              <p>
                {/U2F.*/.test(currentAccount.description!)
                  ? "Encrypted..."
                  : currentAccount.description}
              </p>
            </div>
          </div>

          <div className={styles.security_wrapper}>
            <p>
              <strong>Security Question:</strong>
            </p>
            <div className={styles.security_box}>
              <p>
                {/U2F.*/.test(currentAccount.securityQuestion!)
                  ? "Encrypted..."
                  : currentAccount.securityQuestion}
              </p>
            </div>
          </div>

          <div className={styles.security_answer_wrapper}>
            <p>
              <strong>Security Answer:</strong>
            </p>
            <div className={styles.security_answer_box}>
              <p>
                {/U2F.*/.test(currentAccount.securityAnswer!)
                  ? "Encrypted..."
                  : currentAccount.securityAnswer}
              </p>
            </div>
          </div>

          <div className={styles.backup_codes_wrapper}>
            <p>
              <strong>Backup Codes:</strong>
            </p>
            <div className={styles.backup_codes_box}>
              <p>
                {/U2F.*/.test(currentAccount.backupCodes!)
                  ? "Encrypted..."
                  : currentAccount.backupCodes}
              </p>
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
