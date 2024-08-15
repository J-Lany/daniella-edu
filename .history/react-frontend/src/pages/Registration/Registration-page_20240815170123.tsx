import styles from "./styles.module.css";
import Input from "../../components/Input/Input";
import Button, { ButtonStyle } from "../../components/Button/Button";


function RegistrationPage() {
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

export default RegistrationPage;
