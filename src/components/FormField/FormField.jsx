import NoDraggableImg from "../NoDraggableImg/NoDraggableImg";
import styles from "./FormField.module.css";

function FormField({
  className = "",
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
      <h5 className={styles["form__field-header"]}>{placeholder}</h5>
      <div className={styles["form__field-div"]}>
        <input
          type={inputType}
          maxLength={maxLength}
          className={
            error == "" || error == null
              ? `${styles["form__field-div-input"]} ${className}`
              : `${styles["form__field-div-input"]} ${className} ${styles["incorrect"]}`
          }
          value={value}
          onChange={(e) => handleChange(name, e.target.value)}
          required
        />
        {logo ? <NoDraggableImg src={logo} className={styles["icon"]} /> : null}
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
