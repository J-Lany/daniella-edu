import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import Button, { ButtonType } from "../../components/Button/Button";
import Input from "../../components/Input/Input";

function LoginPage() {
  const { register, handleSubmit, errors } = useForm();

  const navigate = useNavigate();

   const onSubmit = (data) => {
 х
    console.log(data);
    navigate("/dashboard"); 
  };

  const handleSignup = () => {
    navigate("/registration");
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
          Don't have an account? <Button text="Sign up" type={ButtonType.Light} onClick={handleSignup} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
