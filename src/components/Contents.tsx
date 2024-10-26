import { Link } from "react-router-dom";
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
      <div className={styles.contents_list}>
        <ul>
          {sortedAccounts.map((account: Account) => {
            return (
              <Link to={`/single/${account.id}`}>
                <div className={styles.account_name}>
                  <li>{account.accountName}</li>
                </div>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Contents;
