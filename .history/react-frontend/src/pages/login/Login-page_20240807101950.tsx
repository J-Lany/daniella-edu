import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles.module.css";
import Button, { ButtonStyle } from "../../components/Button/Button";
import Input from "../../components/Input/Input";

interface FormData {
  username: string;
  password: string;
}

function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>({mode: "onChange"});
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };


  const handleSignup = () => {
    navigate("/registration");
  };

  return (
   <div className={styles.loginPage}>
     <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <Input label="Email" name="email" type="email" register={register}  />
      <Input label="Password" name="password" register={register}  />
      <Button text="Log in" type="submit" style={ButtonStyle.Primary} />
      <div>
        Don't have an account? <Button text="Sign up" type="button" style={ButtonStyle.Light} onClick={handleSignup} />
      </div>
    </form>
   </div>
  );
}

export default LoginPage;
