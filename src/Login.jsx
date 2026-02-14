import "./Login.css";
import vector from "./assets/vector.svg";
import lock from "./assets/lock.svg";
import { useRef, useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailRef = useRef(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const passwordRef = useRef(null);

  function Validation(emailInput, passwordInput) {
    setEmailError(emailInput.validationMessage);
    setPasswordError(passwordInput.validationMessage);
  }

  return (
    <>
      <form noValidate method="post" className="login">
        <h5 className="header-login">Login</h5>
        <div className="form__field">
          <div className="email">
            <input
              type="email"
              ref={emailRef}
              className={
                emailError == "" ? "email-input" : "email-input incorrect"
              }
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(e.target.validationMessage);
              }}
              required
            />
            <img src={vector} className="email-icon" />
          </div>
          <span
            className="email-error error"
            style={{ display: emailError == "" ? "none" : "block" }}
          >
            {emailError}
          </span>
        </div>
        <div className="form__field">
          <div className="password">
            <input
              type="password"
              ref={passwordRef}
              className={
                passwordError == ""
                  ? "password-input"
                  : "password-input incorrect"
              }
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(e.target.validationMessage);
              }}
              required
            />
            <img src={lock} className="password-icon" />
          </div>
          <span
            className="password-error error"
            style={{ display: passwordError == "" ? "none" : "block" }}
          >
            {passwordError}
          </span>
        </div>
        <button
          type="submit"
          className="login-button"
          disabled={emailError != "" || passwordError != ""}
          onClick={() => Validation(emailRef.current, passwordRef.current)}
        >
          Login
        </button>
        <div className="register">
          Don`t have an account?{" "}
          <a href="#" className="register-link">
            Register
          </a>
        </div>
      </form>
    </>
  );
}

export default Login;
