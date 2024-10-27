import { FC } from "react";
import styles from "../styles/accountlist.module.css";

export type Account = {
  id: string;
  accountName: string;
  loginUrl: string;
  email: string;
  username: string;
  password: string;
  description: string;
  typeOf2FA: string;
  securityQuestion: string;
  securityAnswer: string;
  passwordExpiry: string;
  backupCodes: string;
  accountStatus: string;
  createdAt: string;
};

const AccountList: FC<{
  accounts: Account[];
}> = ({ accounts }) => {
  return (
    <div id={styles.list_area}>
      <ul>
        {accounts.map((account: Account) => {
          return (
            <li className={styles.accountListItems} key={account.id}>
              <h2>{account.accountName}</h2>
              <p>
                <strong>Login URL:</strong> {account.loginUrl}
              </p>
              <p>
                <strong>Email:</strong> {account.email}
              </p>
              <p>
                <strong>Username:</strong> {account.username}
              </p>
              <p>
                <strong>Password:</strong> {account.password}
              </p>
              <p>
                <strong>Description:</strong> {account.description}
              </p>
              <p>
                <strong>Type of 2FA:</strong> {account.typeOf2FA}
              </p>
              <p>
                <strong>Security Question:</strong> {account.securityQuestion}
              </p>
              <p>
                <strong>Security Answer:</strong> {account.securityAnswer}
              </p>
              <p>
                <strong>Password Expiry:</strong> {account.passwordExpiry}
              </p>
              <p>
                <strong>Backup Codes:</strong> {account.backupCodes}
              </p>
              <p>
                <strong>Account Status:</strong> {account.accountStatus}
              </p>
              <p>
                <strong>Created At:</strong> {account.createdAt}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AccountList;
