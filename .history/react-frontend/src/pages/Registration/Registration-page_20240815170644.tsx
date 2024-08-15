import styles from "./styles.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button, { ButtonStyle } from "../../components/Button/Button";
import Toast from "../../components/Toast/Toast";
import { RegistrationData } from "../../types/RegistrationData";



function RegistrationPage() {
  const { register, handleSubmit } = useForm<RegistrationData>({ mode: "onChange" });
  const navigate = useNavigate();

  const handleSignup = useCallback(() => {
    navigate("/login");
  }, [navigate]);


  return (
    <div className={styles.registrationPage}>
      <form className={styles.registrationForm} onSubmit={handleSubmit(onSubmit)}>
        <Input name="email" type="email" register={register} />
        <Input name="password" type="password" register={register} />
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
