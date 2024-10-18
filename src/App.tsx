import { useEffect, useState } from "react";
// import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import Contents from "./components/Contents";
import AccountList from "./components/AccountList";
import styles from "./App.module.css";
const { ipcRenderer } = require("electron");

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    ipcRenderer.send("loadTasks");

    ipcRenderer.on("loadTasksResponse", (event, data) => {
      console.log(data, "data here");

      setTasks(JSON.parse(data));
      setIsLoaded(true);
    });

    return () => {
      ipcRenderer.removeAllListeners("loadTasksResponse");
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      ipcRenderer.send("saveTasks", JSON.stringify(tasks));
    }
    return () => {
      ipcRenderer.removeAllListeners("loadTasksResponse");
    };
  }, [tasks]);

  return (
    <div>
      <Header />
      <div id={styles.page_section}>
        <div id={styles.content_wrapper}>
          <Contents />
        </div>
        <div>
          <Form setTasks={setTasks} />
          <AccountList tasks={tasks} />
        </div>
      </div>
    </div>
  );
}

export default App;
