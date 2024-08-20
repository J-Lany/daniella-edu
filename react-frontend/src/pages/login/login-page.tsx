import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { clearError } from "../../redux/slices/authSlice";
import { clearRegSucsess } from "../../redux/slices/registrationSlice";
import { loginAsync } from "../../redux/thunks/authThunks";
import { AuthData } from "../../types/AuthData";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles.module.css";
import Button, { ButtonStyle } from "../../components/Button/Button";
import Toast from "../../components/Toast/Toast";
import { ToastType } from "../../components/Toast/Toast";
import { useAppDispatch } from "../../hook/hook";
import { selectIsAuthenticated, selectAuthError } from "../../redux/selectors/authSelectors";
import { selectIsRegistrationSucsess } from "../../redux/selectors/registrationSelectors";

function LoginPage() {
  const { register, handleSubmit } = useForm<AuthData>({ mode: "onChange" });
  const navigate = useNavigate();

  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isRegistrationSucsess = useSelector(selectIsRegistrationSucsess);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
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

  const closeToast = useCallback(() => {
    dispatch(clearError());
    dispatch(clearRegSucsess());
  }, [dispatch]);

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.formInput}
          placeholder="Email"
          type="email"
          {...register("email", { required: true })}
        />
        <input
          className={styles.formInput}
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
        <Button text="Log in" type="submit" className={ButtonStyle.Primary} />
        <div>
          Don't have an account?
          <Button text="Sign up" type="button" className={ButtonStyle.Light} onClick={handleSignup} />
        </div>
        {error && <Toast message={error} type={ToastType.Error} handleClose={closeToast} />}
        {isRegistrationSucsess && (
          <Toast message={"Registration successful!"} type={ToastType.Success} handleClose={closeToast} />
        )}
      </form>
    </div>
  );
}

export default LoginPage;
