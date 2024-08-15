import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { clearError } from "../../redux/slices/authSlice";
import { loginAsync } from "../../redux/thunks/authThunks";
import { AuthData } from "../../types/AuthData";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles.module.css";
import Button, { ButtonStyle } from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Toast from "../../components/Toast/Toast";
import { ToastType } from "../../components/Toast/Toast";
import { useEffect } from "react";

function LoginPage() {
  const { register, handleSubmit } = useForm<AuthData>({ mode: "onChange" });
  const navigate = useNavigate();

  const error = useSelector((state: any) => state.auth.error);
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<AuthData> = async (data: AuthData) => {
    await dispatch(loginAsync(data) as any);
  };

  const handleSignup = useCallback(() => {
    navigate("/registration");
  }, [navigate]);

  const closeErrorToast = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

 

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" name="email" type="email" register={register} />
        <Input label="Password" name="password" type="password" register={register} />
        <Button text="Log in" type="submit" className={ButtonStyle.Primary} />
        <div>
          Don't have an account?{" "}
          <Button text="Sign up" type="button" className={ButtonStyle.Light} onClick={handleSignup} />
        </div>
        {error && <Toast message={error} type={ToastType.Error} handleClose={closeErrorToast} />}
      </form>
    </div>
  );
}

export default LoginPage;
