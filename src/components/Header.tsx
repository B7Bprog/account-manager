import { Link } from "react-router-dom";
import styles from "../styles/header.module.css";

const Header = () => {
  return (
    <div id={styles.header}>
      <Link className={styles.headerLink} to="/">
        <h1>Account Manager</h1>
      </Link>
      <Link className={styles.headerLink} to="/list">
        Accounts
      </Link>
      <Link className={styles.headerLink} to="/set">
        Add Account
      </Link>
    </div>
  );
};

export default Header;
