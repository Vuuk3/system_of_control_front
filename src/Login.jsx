import styles from "./Login.module.css";
import vector from "./assets/vector.svg";
import lock from "./assets/lock.svg";
import { useRef, useState } from "react";

function Login() {
  const [emailError, setEmailError] = useState("");
  const emailRef = useRef(null);
  const [passwordError, setPasswordError] = useState("");
  const passwordRef = useRef(null);

  function Validation(inputElement, setError) {
    if (
      !inputElement.checkValidity() &&
      inputElement.type == "email" &&
      inputElement.value != ""
    ) {
      setError(`Адрес "${inputElement.value}" некорректен`);
    } else if (inputElement.value == "") {
      setError("Заполните поле");
    } else {
      setError("");
    }
  }

  return (
    <>
      <form noValidate method="post" className={styles.login}>
        <h5 className={styles["header-login"]}>Login</h5>
        <div className={styles["form__field"]}>
          <div className={styles.email}>
            <input
              type="email"
              ref={emailRef}
              className={
                emailError == ""
                  ? styles["email-input"]
                  : `${styles["email-input"]} ${styles["incorrect"]}`
              }
              placeholder="Email"
              onChange={() => Validation(emailRef.current, setEmailError)}
              required
            />
            <img src={vector} className={styles["email-icon"]} />
          </div>
          <span
            className={`${styles["email-error"]} ${styles["error"]}`}
            style={{ display: emailError == "" ? "none" : "block" }}
          >
            {emailError}
          </span>
        </div>
        <div className={styles["form__field"]}>
          <div className={styles.password}>
            <input
              type="password"
              ref={passwordRef}
              className={
                passwordError == ""
                  ? styles["password-input"]
                  : `${styles["password-input"]} ${styles["incorrect"]}`
              }
              placeholder="Password"
              onChange={() => Validation(passwordRef.current, setPasswordError)}
              required
            />
            <img src={lock} className={styles["password-icon"]} />
          </div>
          <span
            className={`${styles["password-error"]} ${styles["error"]}`}
            style={{ display: passwordError == "" ? "none" : "block" }}
          >
            {passwordError}
          </span>
        </div>
        <button
          type="submit"
          className={styles["login-button"]}
          disabled={emailError != "" || passwordError != ""}
          onClick={() => {
            Validation(emailRef.current, setEmailError);
            Validation(passwordRef.current, setPasswordError);
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
    </>
  );
}

export default Login;
