import styles from "../styles/contents.module.css";

import { Account } from "./AccountList";
import { FC, useEffect, useState } from "react";

const Contents: FC<{
  accounts: Account[];
}> = ({ accounts }) => {
  const [sortedAccounts, setSortedAccounts] = useState<Account[]>([]);
  useEffect(() => {
    sortAccountsByNames();
  }, [accounts]);
  const sortAccountsByNames = () => {
    setSortedAccounts(
      [...accounts].sort((a, b) => a.accountName.localeCompare(b.accountName))
    );
  };
  return (
    <div id={styles.contentsWrapper}>
      <h1>Contents</h1>
      <ul>
        {sortedAccounts.map((account: Account) => {
          return (
            <div>
              <li>{account.accountName}</li>
              <li>{account.id}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Contents;
