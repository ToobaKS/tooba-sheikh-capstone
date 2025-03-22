import "./RegisterForm.scss";

function RegisterForm() {
  return (
    <form className="register-form">
      <input
        type="text"
        placeholder="First Name"
        className="register-form__input"
      />
      <input
        type="text"
        placeholder="Last Name"
        className="register-form__input"
      />
      <input
        type="text"
        placeholder="Username"
        className="register-form__input"
      />

      <input
        type="email"
        placeholder="Email"
        className="register-form__input"
      />
      <input
        type="password"
        placeholder="Password"
        className="register-form__input"
      />
      <button type="submit" className="register-form__button">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
