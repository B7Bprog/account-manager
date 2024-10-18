import { FC } from "react";
import styles from "../styles/tasklist.module.css";

const AccountList: FC<{ tasks: { title: string; description: string }[] }> = ({
  tasks,
}) => {
  return (
    <div id={styles.list_area}>
      <ul>
        {tasks.map((task: { title: string; description: string }) => {
          return (
            <li>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AccountList;
