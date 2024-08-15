import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles.module.css";
import Button, { ButtonType } from "../../components/Button/Button";
import Input from "../../components/Input/Input";

interface FormData {
  username: string;
  password: string;
}

function LoginPage() {
  const { register, handleSubmit, errors } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    history.push("/dashboard");
  };

  const handleSignup = () => {
    navigate("/registration");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Username" name="username" rules={{ required: "Username is required" }} error={errors.username} />
      
      <Input label="Password" name="password" rules={{ required: "Password is required" }} error={errors.password} />
      
      <button type="submit">Login</button>
      <div>
          Don't have an account? <Button text="Sign up" type={ButtonType.Light} onClick={handleSignup} />
        </div>
    </form>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
          placeholder="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          onBlur={handleUsernameBlur}
          type="text"
        />
    <input type="text" name="username" ref={register({required: "Username is required"})} />
    {errors.username && <span>{errors.username.message}</span>}
    
    <input type="password" name="password" ref={register({required: "Password is required"})} />
    {errors.password && <span>{errors.password.message}</span>}
    
    <button type="submit">Login</button>
  </form>

    <div className={styles.loginPage}>
      <h3>Log in</h3>
      <div className={styles.loginForm}>
        
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
