import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from "../../redux/slices/authSlice";
import { loginAsync } from "../../redux/thunks/authThunks";
import { AuthData } from "../../types/AuthData";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles.module.css";
import Button, { ButtonStyle } from "../../components/Button/Button";
import Input from "../../components/Input/Input";


function LoginPage() {
  const { register, handleSubmit } = useForm<AuthData>({mode: "onChange"});
  const navigate = useNavigate();

  const error = useSelector((state: any) => state.auth.error);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<AuthData> = (data) => {
    dispatch(loginAsync(data));
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
