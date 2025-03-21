import "./LoginPage.scss";
import AccessCard from "../../components/AccessCard/AccessCard";
import LoginForm from "../../components/LoginForm/LoginForm";

function LoginPage() {
  return (
    <main className="login">
      <AccessCard title="Login">
        <LoginForm />
      </AccessCard>
    </main>
  );
}

export default LoginPage;
