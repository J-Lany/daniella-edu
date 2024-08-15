import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback , useEffect} from "react";

import { clearError } from "../../redux/slices/authSlice";
import { loginAsync } from "../../redux/thunks/authThunks";
import { AuthData } from "../../types/AuthData";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles.module.css";
import Button, { ButtonStyle } from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Toast from "../../components/Toast/Toast";
import { ToastType } from "../../components/Toast/Toast";
import { useAppDispatch } from "../../hook/hook";
import { RootState } from "../../types/RootState";

function LoginPage() {
  const { register, handleSubmit } = useForm<AuthData>({ mode: "onChange" });
  const navigate = useNavigate();

  const error = useSelector((state: RootState) => state.auth.error);
  const isAuthenticated = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<AuthData> = useCallback(
    (data) => {
      dispatch(loginAsync(data));
    },
    [dispatch]
  );

  const handleSignup = useCallback(() => {
    navigate("/registration");
  }, [navigate]);

  const closeErrorToast = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <Input name="email" type="email" register={register} />
        <Input name="password" type="password" register={register} />
        <Button text="Log in" type="submit" className={ButtonStyle.Primary} />
        <div>
          Don't have an account?
          <Button text="Sign up" type="button" className={ButtonStyle.Light} onClick={handleSignup} />
        </div>
        {error && <Toast message={error} type={ToastType.Error} handleClose={closeErrorToast} />}
      </form>
    </div>
  );
}

export default LoginPage;
