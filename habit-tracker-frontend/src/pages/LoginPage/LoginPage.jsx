import "./LoginPage.scss";
import AccessCard from "../../components/AccessCard/AccessCard";
import LoginForm from "../../components/LoginForm/LoginForm";
import plant from "../../assets/images/49.png";

function LoginPage() {
  return (
    <main className="login">
      <AccessCard title="Login">
        <img className="login__plant" src={plant} alt="plant" />
        <LoginForm />
      </AccessCard>
    </main>
  );
}

export default LoginPage;
