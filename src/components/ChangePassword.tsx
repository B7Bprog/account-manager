import { useState, FormEvent, FC } from "react";

const ChangePassword: FC = () => {
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordInputCheck, setPasswordInputCheck] = useState("");
  const [pwMismatch, setPwMismatch] = useState(false);
  const [validationMessages, setValidationMessages] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationMessages([]);
    setPwMismatch(false);
    if (passwordInput !== passwordInputCheck) setPwMismatch(true);
    else if (passwordInput.length < 12)
      setValidationMessages((messages) => {
        return [...messages, "Password must be at least 12 characters long!"];
      });
    else if (passwordInput === passwordInput.toLowerCase())
      setValidationMessages((messages) => {
        return [...messages, "Password must contain uppercase characters!"];
      });
    else if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(passwordInput))
      setValidationMessages((messages) => {
        return [...messages, "Password must contain special characters!"];
      });
    //[$&+,:;=?@#|'<>.^*()%!-]
    else {
      console.log("setting context");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter new password:</label>
        <input onChange={(e) => setPasswordInput(e.target.value)}></input>
        <label>Enter password again:</label>
        <input onChange={(e) => setPasswordInputCheck(e.target.value)}></input>
        <button type="submit">Save Password</button>
      </form>
      <div>
        {pwMismatch ? <h3>The two passwords must match!</h3> : null}

        {validationMessages.length > 0
          ? validationMessages.map((message) => {
              return <h3 key={message}>{message}</h3>;
            })
          : null}
      </div>
    </div>
  );
};

export default ChangePassword;
