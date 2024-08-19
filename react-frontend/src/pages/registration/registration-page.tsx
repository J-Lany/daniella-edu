import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { setError, clearError } from "../../redux/slices/registrationSlice";
import { RegistrationData } from "../../types/RegistrationData";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hook/hook";
import Button, { ButtonStyle } from "../../components/Button/Button";
import Toast, { ToastType } from "../../components/Toast/Toast";
import { selectIsRegistrationSucsess, selectRegistrationError } from "../../redux/selectors/registrationSelectors";
import { registrationAsync } from "../../redux/thunks/registrationThunks";

function RegistrationPage() {
  const { register, handleSubmit, watch } = useForm<RegistrationData>({ mode: "onChange" });
  const password = watch("password");
  const navigate = useNavigate();

  const error = useSelector(selectRegistrationError);
  const isRegSucsess = useSelector(selectIsRegistrationSucsess);

  useEffect(() => {
    if (isRegSucsess) {
      navigate("/login");
    }
  }, [isRegSucsess, navigate]);

  const dispatch = useAppDispatch();

  const validateRepeatedPassword = (value: string) => {
    if (value !== password) {
      dispatch(setError("Passwords do not match"));
      return false;
    }
    dispatch(clearError());
    return true;
  };

  const onSubmit: SubmitHandler<RegistrationData> = useCallback(
    (data) => {
      dispatch(registrationAsync(data));
    },
    [dispatch]
  );

  const handleSignin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const closeErrorToast = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <div className={styles.registrationPage}>
      <form className={styles.registrationForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.formInput}
          placeholder="Login"
          type="text"
          {...register("login", { required: true })}
        />
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
        <input
          className={styles.formInput}
          placeholder="Repeat password"
          type="password"
          {...register("repeatedPassword", { required: true, validate: validateRepeatedPassword })}
        />
        <Button text="Log in" type="submit" className={ButtonStyle.Primary} />
        <div>
          Already have an account?
          <Button text="Sign in" type="button" className={ButtonStyle.Light} onClick={handleSignin} />
        </div>
        {error && <Toast message={error} type={ToastType.Error} handleClose={closeErrorToast} />}
      </form>
    </div>
  );
}

export default RegistrationPage;
