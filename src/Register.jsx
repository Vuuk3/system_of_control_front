import styles from "./Register.module.css";
import vector from "./assets/vector.svg";
import lock from "./assets/lock.svg";
import { useRef, useState } from "react";

function Register() {
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
      <form noValidate method="post" className={styles.login}>
        <h5 className={styles["header-login"]}>Registration</h5>
        <div className={styles.form__field}>
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(e.target.validationMessage);
              }}
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
        <div className={styles.form__field}>
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(e.target.validationMessage);
              }}
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
          className={styles["register-button"]}
          disabled={emailError != "" || passwordError != ""}
          onClick={() => Validation(emailRef.current, passwordRef.current)}
        >
          Register
        </button>
      </form>
    </>
  );
}

export default Register;
