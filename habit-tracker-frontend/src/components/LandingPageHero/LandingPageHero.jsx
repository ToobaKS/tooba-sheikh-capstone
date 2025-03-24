import "./LandingPageHero.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logos/logo-8.png";
import plant1 from "../../assets/images/plants-1.png";
import SButton from "../Button/Button";

function LandingPageHero() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <>
      <div className="landing-hero">
        <div className="landing-hero__logo-container">
          <img
            src={logo}
            alt="Rootinely Logo"
            className="landing-hero__logo"
            onClick={() => setIsOpen(!isOpen)}
          />
          <div className="landing-hero__main">
            <div className="landing-hero__titles">
              <h1 className="landing-hero__title">Rootinely</h1>
              <h2 className="landing-hero__subtitle">
                Grow your habits, grow yourself.
              </h2>
            </div>
            <div className="landing-hero__buttons">
              <SButton label="Login" handleSubmit={handleLogin}/>
              <SButton label="Register" handleSubmit={handleRegister}/>
            </div>
          </div>
        </div>

        <div className="decorations">
          <img
            src={plant1}
            alt="Decorative Plant"
            className="decorations__plant1"
          />
        </div>
      </div>
    </>
  );
}

export default LandingPageHero;
