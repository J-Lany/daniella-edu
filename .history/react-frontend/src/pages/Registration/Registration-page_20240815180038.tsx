import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { clearError } from "../../redux/slices/authSlice";
import { RegistrationData } from "../../types/RegistrationData";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hook/hook";
import Button, { ButtonStyle } from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Toast, { ToastType } from "../../components/Toast/Toast";
import { selectIsRegistrationSucsess, selectRegistrationError } from "../../redux/selectors/registrationSelectors";
import { registrationAsync } from "../../redux/thunks/registrationThunks";

function RegistrationPage() {
  const { register, handleSubmit, watch, setError, clearErrors } = useForm<RegistrationData>({ mode: "onChange" });
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
      return "Passwords do not match";
    }
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
    <div className={styles.loginPage}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <Input name="email" type="email" register={register} />
        <Input name="login" type="text" register={register} />
        <Input name="password" type="password" register={register} />
        <Input name="repeatPassword" type="password" ref={register({ required: true, validate: validateRepeatedPassword })} />
        <Button text="Log in" type="submit" className={ButtonStyle.Primary} />
        <div>
          Already have an account?
          <Button text="Sign up" type="button" className={ButtonStyle.Light} onClick={handleSignin} />
        </div>
        {error && <Toast message={error} type={ToastType.Error} handleClose={closeErrorToast} />}
      </form>
    </div>
  );
}

export default RegistrationPage;
