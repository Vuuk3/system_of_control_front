import styles from "./PasswordField.module.css";
import eye from "./eye.svg";
import eyeSlash from "./eye-slash.svg";
import { useState } from "react";
import NoDraggableImg from "../NoDraggableImg/NoDraggableImg";

function PasswordField({ maxLength, placeholder, value, error, handleChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className={styles["form__field"]}>
        <div className={styles["form__field-div"]}>
          <input
            type={showPassword ? "text" : "password"}
            maxLength={maxLength}
            className={
              error == "" || error == null
                ? styles["form__field-div-input"]
                : `${styles["form__field-div-input"]} ${styles["incorrect"]}`
            }
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
          <NoDraggableImg
            src={showPassword ? eye : eyeSlash}
            className={styles["password-icon"]}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          />
        </div>
        <span
          className={styles["error"]}
          style={{
            visibility: error == "" ? "none" : "visible",
          }}
        >
          {error}
        </span>
      </div>
    </>
  );
}

export default PasswordField;
