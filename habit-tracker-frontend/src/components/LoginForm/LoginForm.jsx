import "./LoginForm.scss";
import { useState } from "react";
import { loginUser } from "../../util/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      console.log("Login successful:", response);
      navigate("/home"); // or wherever you want to send them!
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="login-form__input"
        value={formData.email}
        onChange={handleChange}
      />
      <div className="login-form__password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          className="login-form__input"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="button"
          className="login-form__toggle"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <button type="submit" className="login-form__button">
        Login
      </button>
      <p className="login-form__footer">
        Don't have an account?{" "}
        <a className="login-form__footer--link" href="/register">
          Sign Up
        </a>
      </p>
    </form>
  );
}

export default LoginForm;
