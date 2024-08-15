import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearError } from "../../redux/slices/authSlice";
import { loginAsync } from "../../redux/thunks/authThunks";
import { AuthData } from "../../types/AuthData";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles.module.css";
import Button, { ButtonStyle } from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Toast from "../../components/Toast/Toast";
import { ToastType } from "../../components/Toast/Toast";

function LoginPage() {
  const { register, handleSubmit } = useForm<AuthData>({ mode: "onChange" });
  const navigate = useNavigate();

  const error = useSelector((state: any) => state.auth.error);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<AuthData> = async (data: AuthData) => {
   await dispatch(loginAsync(data) as any);
   navigate("/");
  };

  const handleSignup = () => {
    navigate("/registration");
  };

  const handleClose = ()  => {  dispatch(clearError());}


  return (
    <div className={styles.loginPage}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" name="email" type="email" register={register} />
        <Input label="Password" name="password" type="password" register={register} />
        <Button text="Log in" type="submit" style={ButtonStyle.Primary} />
        <div>
          Don't have an account?{" "}
          <Button text="Sign up" type="button" style={ButtonStyle.Light} onClick={handleSignup} />
        </div>
        {error && <Toast message={error} type={ToastType.Error} handleClose={handleClose}/>}
      </form>
    </div>
  );
}

export default LoginPage;
