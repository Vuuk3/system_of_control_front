import styles from "./Register.module.css";
import vector from "./assets/vector.svg";
import lock from "./assets/lock.svg";
import { useRef, useState } from "react";

function Register() {
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
      setError("Адрес некорректен");
    } else if (inputElement.value == "") {
      setError("Заполните поле");
    } else {
      setError("");
    }
  }

  return (
    <>
      <form noValidate method="post" className={styles.login}>
        <h5 className={styles["header-login"]}>Registration</h5>
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
              onChange={() => Validation(emailRef.current, setEmailError)}
              required
            />
            <img src={vector} className={styles["email-icon"]} />
          </div>
          <span
            className={`${styles["email-error"]} ${styles["error"]}`}
            style={{ visibility: emailError == "" ? "none" : "visible" }}
          >
            {emailError}
          </span>
        </div>
        <div className={styles["form__field"]}>
          <div className={styles.password}>
            <input
              type="password"
              maxLength={20}
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
            style={{ visibility: passwordError == "" ? "none" : "visible" }}
          >
            {passwordError}
          </span>
        </div>
        <button
          type="submit"
          className={styles["register-button"]}
          disabled={emailError != "" || passwordError != ""}
          onClick={() => {
            Validation(emailRef.current, setEmailError);
            Validation(passwordRef.current, setPasswordError);
          }}
        >
          Register
        </button>
      </form>
    </>
  );
}

export default Register;
