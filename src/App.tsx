import { useEffect, useState } from "react";
// import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import Contents from "./components/Contents";
import AccountList, { Account } from "./components/AccountList";
import styles from "./App.module.css";
// import { ipcRenderer } from "electron";

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.ipcRenderer.send("loadAccounts");

    window.ipcRenderer.on("loadAccountsResponse", (event, data) => {
      console.log(data, "data here");

      setAccounts(JSON.parse(data));
      setIsLoaded(true);
    });

    return () => {
      window.ipcRenderer.removeAllListeners("loadAccountsResponse");
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      window.ipcRenderer.send("saveAccounts", JSON.stringify(accounts));
    }
    return () => {
      window.ipcRenderer.removeAllListeners("loadAccountsResponse");
    };
  }, [accounts]);

  return (
    <div>
      <Header />
      <div id={styles.page_section}>
        <div id={styles.content_wrapper}>
          <Contents />
        </div>
        <div>
          <Form setAccounts={setAccounts} />
          <AccountList accounts={accounts} />
        </div>
      </div>
    </div>
  );
}

export default App;
