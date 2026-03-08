import styles from "./Salary.module.css";
import CardHeader from "../CardHeader/CardHeader";
import FormField from "@components/FormField/FormField";
import SelectField from "@components/SelectField/SelectField";

const valuta = {
  RUB: "₽",
  EUR: "€",
  USD: "$",
};

function Salary({
  text,
  cardLogo,
  handleChange,
  values,
  errors,
  days,
  bonus,
  fine,
}) {
  return (
    <>
      <div className={`${styles["card"]} ${styles["salary"]}`}>
        <CardHeader text={text} logo={cardLogo} />
        <div className={styles["salary-content"]}>
          <FormField
            className={styles["form_field-div-input"]}
            name="rate_amount"
            inputType="number"
            placeholder="Ставка"
            value={values["rate_amount"]}
            error={errors["rate_amount"]}
            handleChange={handleChange}
          />
          <SelectField
            className={styles["select"]}
            name="currency"
            defaultValue={values["currency"]}
            handleChange={handleChange}
            options={[
              { value: "RUB", text: "Рубли" },
              { value: "EUR", text: "Евро" },
              { value: "USD", text: "Доллары" },
            ]}
          />
          <div className={styles["time_type"]}>
            <h3 className={styles["salary-h3"]}>Вид времени</h3>
            <div className={styles["form_field-rate_type"]}>
              <label className={styles["form_field-rate_type-label"]}>
                <input
                  checked={values["rate_type"] == "hourly"}
                  type="radio"
                  value="hourly"
                  name="rate_type"
                  onChange={(e) => handleChange("rate_type", e.target.value)}
                />
                Часы
              </label>
              <label className={styles["form_field-rate_type-label"]}>
                <input
                  checked={values["rate_type"] == "shift"}
                  type="radio"
                  value="shift"
                  name="rate_type"
                  onChange={(e) => handleChange("rate_type", e.target.value)}
                />
                Смена
              </label>
            </div>
          </div>
          <div className={styles["amount_of_work"]}>
            <h3 className={styles["salary-h3"]}>Количество</h3>
            <p className={styles["amount_of_work-p"]}>{days.length}</p>
          </div>
          <div className={styles["adjustments"]}>
            <div
              className={styles["adjustments-bonus"]}
              style={{ visibility: bonus != null ? "visible" : "hidden" }}
            >
              <h3 className={styles["adjustments-bonus-h3"]}>Премии:</h3>
              <p className={styles["adjustments-bonus-p"]}>{bonus}</p>
            </div>
            <div
              className={styles["adjustments-fine"]}
              style={{ visibility: fine != null ? "visible" : "hidden" }}
            >
              <h3 className={styles["adjustments-fine-h3"]}>Штрафы:</h3>
              <p className={styles["adjustments-fine-p"]}>{fine}</p>
            </div>
          </div>

          <div className={styles["final_salary"]}>
            <h3 className={styles["salary-h3"]}>Итоговая зарплата</h3>
            <p className={styles["final_salary-p"]}>
              {days.length * values["rate_amount"] - fine + bonus}{" "}
              {valuta[values["currency"]]}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Salary;
