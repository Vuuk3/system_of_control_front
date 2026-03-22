import styles from "./PasswordField.module.css";
import fieldStyles from "@components/FormField/FormField.module.css";
import eye from "./eye.svg";
import eyeSlash from "./eye-slash.svg";
import { useState } from "react";
import NoDraggableImg from "../NoDraggableImg/NoDraggableImg";

function PasswordField({ maxLength, placeholder, value, error, handleChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className={fieldStyles["form__field"]}>
        <h5 className={fieldStyles["form__field-header"]}>{placeholder}</h5>
        <div className={fieldStyles["form__field-div"]}>
          <input
            type={showPassword ? "text" : "password"}
            maxLength={maxLength}
            className={
              error == "" || error == null
                ? fieldStyles["form__field-div-input"]
                : `${fieldStyles["form__field-div-input"]} ${fieldStyles["incorrect"]}`
            }
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
          <NoDraggableImg
            src={showPassword ? eye : eyeSlash}
            className={styles["password-icon"]}
            title={showPassword ? "Скрыть пароль" : "Показать пароль"}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          />
        </div>
        <span
          className={fieldStyles["error"]}
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
