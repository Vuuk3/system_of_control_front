import styles from "./FormField.module.css";

function FormField({
  name,
  inputType,
  maxLength,
  placeholder,
  logo,
  value,
  error,
  handleChange,
}) {
  return (
    <div className={styles["form__field"]}>
      <div className={styles["form__field-div"]}>
        <input
          type={inputType}
          maxLength={maxLength}
          className={
            error == "" || error == null
              ? styles["form__field-div-input"]
              : `${styles["form__field-div-input"]} ${styles["incorrect"]}`
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(name, e.target.value)}
          required
        />
        <img src={logo} className={styles["icon"]} />
      </div>
      <span
        className={styles["error"]}
        style={{ visibility: error == "" ? "none" : "visible" }}
      >
        {error}
      </span>
    </div>
  );
}

export default FormField;
