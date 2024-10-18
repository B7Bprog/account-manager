import { FC, FormEvent, useState } from "react";
import styles from "../styles/form.module.css";
import { v1 as uuidv1 } from "uuid";

const Form: FC<{ setTasks: (value: []) => void }> = ({ setTasks }: any) => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTasks((tasks: []) => {
      const fullTask = { id: uuidv1(), title: title, description: description };
      return [fullTask, ...tasks];
    });
    setDescription("");
    setTitle("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div id={styles.title_input}>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div id={styles.description_input}>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add task</button>
    </form>
  );
};

export default Form;
