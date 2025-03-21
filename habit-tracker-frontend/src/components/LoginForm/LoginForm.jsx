import "./LoginForm.scss";

function LoginForm() {
  return (
    <form className="login-form">
      <input type="email" placeholder="Email" className="login-form__input" />
      <input
        type="password"
        placeholder="Password"
        className="login-form__input"
      />
      <button type="submit" className="login-form__button">
        Login
      </button>
      <p className="login-form__footer">
        Don't have an account? <a href="/register">Sign Up</a>
      </p>
    </form>
  );
}

export default LoginForm;
