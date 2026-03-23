import styles from "./SelectField.module.css";
import fieldStyles from "@components/FormField/FormField.module.css";

function SelectField({
  placeholder,
  className = "",
  name,
  defaultValue,
  handleChange,
  options,
}) {
  return (
    <>
      <div className={fieldStyles["form__field"]}>
        <h5 className={fieldStyles["form__field-header"]}>{placeholder}</h5>
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
