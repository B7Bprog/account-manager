import { Link } from "react-router-dom";
import styles from "../styles/contents.module.css";

import { Account } from "./AccountList";
import { FC, useEffect, useState } from "react";

const Contents: FC<{
  accounts: Account[];
}> = ({ accounts }) => {
  const [sortedAccounts, setSortedAccounts] = useState<Account[]>([]);
  const [sortedStraightByName, setSortedStraightByName] = useState(true);
  const [sortedStraightByDate, setSortedStraightByDate] = useState(true);

  useEffect(() => {
    sortAccountsByNames();
  }, [accounts]);

  const sortAccountsByNames = () => {
    setSortedAccounts(
      [...accounts].sort((a, b) => a.accountName.localeCompare(b.accountName))
    );
  };

  const handleNameSortButton = () => {
    if (!sortedStraightByName) {
      setSortedAccounts(
        [...accounts].sort((a, b) => a.accountName.localeCompare(b.accountName))
      );
    } else {
      setSortedAccounts(
        [...accounts].sort((a, b) => b.accountName.localeCompare(a.accountName))
      );
    }
    setSortedStraightByName(!sortedStraightByName);
  };

  const handleDateSortButton = () => {
    if (!sortedStraightByDate) {
      setSortedAccounts(
        [...accounts].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      );
    } else {
      setSortedAccounts(
        [...accounts].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    }
    setSortedStraightByDate(!sortedStraightByDate);
  };

  return (
    <div id={styles.contentsWrapper}>
      <h1>Contents</h1>
      <div className={styles.sort_wrapper}>
        <p id={styles.sortby_text}>Sort by:</p>
        <button className={styles.sort_button} onClick={handleNameSortButton}>
          Name
        </button>
        <button className={styles.sort_button} onClick={handleDateSortButton}>
          Date
        </button>
      </div>
      <div className={styles.contents_list}>
        <ul>
          {sortedAccounts.map((account: Account) => {
            return (
              <Link to={`/single/${account.id}`} key={account.id}>
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
