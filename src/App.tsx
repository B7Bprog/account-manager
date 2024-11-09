import { useContext, useEffect, useState } from "react";
// import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import Contents from "./components/Contents";
import AccountList, { Account } from "./components/AccountList";
import styles from "./App.module.css";
// import { ipcRenderer } from "electron";
import { HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import SingleAccount from "./components/SingleAccount";
import { ConfigContext } from "./contexts/ConfigContext";

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const configContext = useContext(ConfigContext);

  useEffect(() => {
    window.ipcRenderer.send("loadAccounts");

    window.ipcRenderer.on("loadAccountsResponse", (_event, data) => {
      // console.log(data, "data here");

      setAccounts(JSON.parse(data));
      setIsLoaded(true);
    });

    // return () => {
    //   window.ipcRenderer.removeAllListeners("loadAccountsResponse");
    // };
  }, []);

  useEffect(() => {
    console.log("loading config");

    window.ipcRenderer.send("loadConfig");

    window.ipcRenderer.on("loadConfigResponse", (_event, data) => {
      if (configContext) {
        console.log("inside if");
        console.log(JSON.parse(data), "parsed data here");
        configContext.setConfig(JSON.parse(data));
        console.log("Config here after setting context:", configContext.config);
      }
    });

    return () => {
      window.ipcRenderer.removeAllListeners("loadAccountsResponse");
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      window.ipcRenderer.send(
        "saveAccounts",
        JSON.stringify(accounts, null, 2)
      );
    }
    return () => {
      window.ipcRenderer.removeAllListeners("loadAccountsResponse");
    };
  }, [accounts]);

  return (
    <HashRouter basename="/">
      <div className={styles.full_page}>
        <Header />
        <div id={styles.page_section}>
          <div id={styles.content_wrapper}>
            <Contents accounts={accounts} />
          </div>
          <div className={styles.main_area}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/set" element={<Form setAccounts={setAccounts} />} />
              <Route
                path="/list"
                element={<AccountList accounts={accounts} />}
              />
              <Route
                path="/single/:accountId"
                element={
                  <SingleAccount
                    accounts={accounts}
                    setAccounts={setAccounts}
                  />
                }
              />
            </Routes>
          </div>
        </div>
        <div className={styles.copyright}>
          <p> Copyright © 2024 - Bela Bertalan</p>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
