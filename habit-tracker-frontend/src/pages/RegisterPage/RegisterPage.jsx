import "./RegisterPage.scss";
import AccessCard from "../../components/AccessCard/AccessCard";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import plant from "../../assets/gifs/17.gif";

function RegisterPage() {
  return (
    <main className="register">
      <AccessCard title="Register">
        <img className="register__plant" src={plant} alt="plant" />
        <RegisterForm />
      </AccessCard>
    </main>
  );
}

export default RegisterPage;