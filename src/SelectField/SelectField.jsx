import styles from "./SelectField.module.css";

function SelectField({
  className = "",
  name,
  defaultValue,
  handleChange,
  options,
}) {
  return (
    <>
      <div className={styles["form__field"]}>
        <div className={styles["form__field-select"]}>
          <select
            className={`${styles["select"]} ${className}`}
            value={defaultValue}
            onChange={(e) => {
              handleChange(name, e.target.value);
            }}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default SelectField;
