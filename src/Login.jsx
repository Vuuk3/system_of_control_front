import styles from "./Login.module.css";
import mail from "./assets/mail.svg";
import eye from "./assets/eye.svg";
import eyeSlash from "./assets/eye-slash.svg";
import { useRef, useState } from "react";

function Login() {
  const [emailError, setEmailError] = useState("");
  const emailRef = useRef(null);
  const [passwordError, setPasswordError] = useState("");
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  function validation(inputElement, setError) {
    if (
      !inputElement.checkValidity() &&
      inputElement.type == "email" &&
      inputElement.value != ""
    ) {
      setError("Адрес некорректен");
    } else if (inputElement.value == "") {
      setError("Заполните поле");
    } else {
      setError("");
    }
  }

  function submit() {
    const URL = "http://localhost:8001/api/auth/login";
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((answer) =>
        answer.detail == "Logged in"
          ? (window.location.pathname = "/personal_account")
          : answer.detail == "Invalid email or password"
            ? setPasswordError("Неправильный email или пароль")
            : {},
      )
      .catch(() => {});
  }

  return (
    <div className={styles["main"]}>
      <form
        noValidate
        method="post"
        className={styles.login}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <h5 className={styles["header-login"]}>Login</h5>
        <div className={styles["form__field"]}>
          <div className={styles.email}>
            <input
              type="email"
              maxLength={32}
              ref={emailRef}
              className={
                emailError == ""
                  ? styles["email-input"]
                  : `${styles["email-input"]} ${styles["incorrect"]}`
              }
              placeholder="Email"
              onChange={() => setEmailError("")}
              required
            />
            <img src={mail} className={styles["email-icon"]} />
          </div>
          <span
            className={`${styles["email-error"]} ${styles["error"]}`}
            style={{ visibility: emailError == "" ? "hidden" : "visible" }}
          >
            {emailError}
          </span>
        </div>
        <div className={styles["form__field"]}>
          <div className={styles.password}>
            <input
              type={showPassword ? "text" : "password"}
              maxLength={20}
              ref={passwordRef}
              className={
                passwordError == ""
                  ? styles["password-input"]
                  : `${styles["password-input"]} ${styles["incorrect"]}`
              }
              placeholder="Password"
              onChange={() => setPasswordError("")}
              required
            />
            <img
              src={showPassword ? eye : eyeSlash}
              className={styles["password-icon"]}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <span
            className={`${styles["password-error"]} ${styles["error"]}`}
            style={{ visibility: passwordError == "" ? "hidden" : "visible" }}
          >
            {passwordError}
          </span>
        </div>
        <button
          type="submit"
          className={styles["login-button"]}
          disabled={emailError != "" || passwordError != ""}
          onClick={() => {
            validation(emailRef.current, setEmailError);
            validation(passwordRef.current, setPasswordError);
          }}
        >
          Login
        </button>
        <div className={styles.register}>
          Don`t have an account?{" "}
          <a href="/register" className={styles["register-link"]}>
            Register
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
