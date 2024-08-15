import Button, { ButtonType } from "../../components/Button/Button";

function LoginPage() {

  const handleLogin = () => {
    console.log("login");
  };


  return (
    <div className="login-page">
      <h1>login</h1>
      <Button text="Login" type={ButtonType.Primary} onClick={handleLogin} />
    </div>
  );
}

export default LoginPage;
