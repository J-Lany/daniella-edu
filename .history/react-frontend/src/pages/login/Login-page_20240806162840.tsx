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
    navigate("/registration");
  };

  const handleSignup = () => {
    navigate("/registration");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Username" name="username" register={register({required: "Username is required"})} error={errors.username} />
      
      <Input label="Password" name="password" register={register({required: "Password is required"})} error={errors.password} />
      
      <button type="submit">Login</button>

      <div>
          Don't have an account? <Button text="Sign up" type={ButtonType.Light} onClick={handleSignup} />
        </div>
    </form>
  );

  
        <Button text="Log in" type={ButtonType.Primary} onClick={handleLogin} />
        <div>
          Don't have an account? <Button text="Sign up" type={ButtonType.Light} onClick={handleSignup} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
