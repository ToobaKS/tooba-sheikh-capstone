import "./RegisterForm.scss";
import { registerUser } from "../../util/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
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
    console.log(formData);
    try {
      const response = await registerUser(formData);
      console.log("Registration successful", response);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <form className="register-form">
      <input
        type="text"
        placeholder="First Name"
        className="register-form__input"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Last Name"
        className="register-form__input"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Username"
        className="register-form__input"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

      <input
        type="email"
        placeholder="Email"
        className="register-form__input"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        className="register-form__input"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="register-form__button"
        onClick={handleSubmit}
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
