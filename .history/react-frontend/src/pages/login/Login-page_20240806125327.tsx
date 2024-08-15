import  { useState } from "react";
import styles from "./styles.module.css";
import Button, { ButtonType } from "../../components/Button/Button";
import Input from "../../components/Input/Input";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handleUsernameBlur = (value: string) => {
    console.log("Username after blur:", value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handlePasswordBlur = (value: string) => {
    console.log("Password after blur:", value);
  };

  const handleLogin = () => {
    console.log("login");
  };

  return (
    <div className={styles.loginPage}>
      <h3>Log in</h3>
      <div className={styles.loginForm}>
        <Input
          placeholder="username"
          value={username}
          onChange={handleUsernameChange}
          onBlur={handleUsernameBlur}
          type="text"
        />
        <Input
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          type="password"
        />
        <Button text="Log in" type={ButtonType.Primary} onClick={handleLogin} />
        <div>
          Don't have an account? <Button text="Sign up" type={ButtonType.Light} onClick={handleLogin} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
