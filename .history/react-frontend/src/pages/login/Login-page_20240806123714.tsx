import React, { useState } from "react";
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
    <div className="login-page">
      <h1>login</h1>
      <Input   placeholder="username"
        value={username}
        onChange={handleUsernameChange}
        onBlur={handleUsernameBlur}
        type="text" />
          <Input     placeholder="password"
        value={password}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        type="password" />
      <Button text="Login" type={ButtonType.Primary} onClick={handleLogin} />
    </div>
  );
}

export default LoginPage;