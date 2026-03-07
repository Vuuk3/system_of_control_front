import styles from "./AddEmployee.module.css";
import { person, calendar, salary, company } from "./icons";
import { useState } from "react";
import FormField from "./FormField/FormField";
import Calendar from "./Calendar/Calendar";
import SelectField from "./SelectField/SelectField";
import SubmitButton from "./SubmitButton/SubmitButton";
import Dialog from "./Dialog/Dialog";
import { useNavigate } from "react-router";
import { useEmployees } from "./EmployeesContext";

function CardHeader({ text, logo }) {
  return (
    <div className={styles["card_header"]}>
      <img className={styles["card_header-logo"]} src={logo} />
      <h2 className={styles["card_header-h2"]}>{text}</h2>
    </div>
  );
}

function DateOfWork({ day }) {
  return (
    <div className={styles["date"]}>
      <p className={styles["date-p"]}>
        {new Intl.DateTimeFormat("ru-RU", {
          day: "2-digit",
          month: "long",
        }).format(day)}
      </p>
      <div className={styles["time"]}>
        <input
          type="text"
          className={styles["time-input"]}
          value="08:00"
          maxLength={5}
          readOnly={true}
        />
        <span>-</span>
        <input
          type="text"
          className={styles["time-input"]}
          value="18:00"
          maxLength={5}
          readOnly={true}
        />
      </div>
    </div>
  );
}

function DatesOfWork({ dates }) {
  return (
    <>
      <div className={styles["dates-wrapper"]}>
        {dates.map((date) => (
          <DateOfWork key={date.toISOString()} day={date} />
        ))}
      </div>
    </>
  );
}

function AddEmployee() {
  const data = {
    email: "test@yan.ru",
    password: "",
    full_name: "Dd Dd",
    phone: "",
    position: "",
    rate_type: "hourly",
    rate_amount: 0,
    currency: "RUB",
  };
  const [values, setValues] = useState(data);
  const [errors, setErrors] = useState({});
  const [days, setDays] = useState([]);
  const [cancel, setCancel] = useState(false);
  const [save, setSave] = useState(false);
  const { createEmployee } = useEmployees();
  const navigate = useNavigate();

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validation(values) {
    const newErrors = {};
    const emailRegex = new RegExp(
      "^([A-Za-z0-9._%+-])+@+([a-z0-9.-])+\.[a-z]{2,}$",
    );
    const fioRegex = new RegExp(
      "^[A-ZА-Я][a-zа-я]+(-[A-ZА-Я][a-zа-я]+)?\\s[A-ZА-Я][a-zа-я]+(\\s[A-ZА-Я][a-zа-я]+)?$",
      "u",
    );
    const phoneRegex = new RegExp("^\\+?[1-9]\\d{7,14}$");
    if (values.full_name.length == 0) {
      newErrors.full_name = "Заполните поле";
    } else if (!fioRegex.test(values.full_name)) {
      newErrors.full_name = 'Не соответствует формату: "Иванов Иван Иавнович"';
    }
    if (values.position.length == 0) {
      newErrors.position = "Заполните поле";
    }
    if (values.email.length == 0) {
      newErrors.email = "Заполните поле";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Адрес некорректен";
    }
    if (values.phone.length == 0) {
      newErrors.phone = "Заполните поле";
    } else if (!phoneRegex.test(values.phone)) {
      newErrors.phone = "Номер телефона некорректен";
    }
    if (values.rate_amount.length == 0) {
      newErrors.rate_amount = "Заполните поле";
    }
    return newErrors;
  }

  const add = async () => {
    const data = {
      ...values,
      schedule: days,
    };
    setSave(false);
    try {
      await createEmployee(data);
      navigate("/employees");
    } catch (err) {
      if (err.response.data.detail == "User with this email already exists") {
        setErrors((prev) => ({
          ...prev,
          ["email"]: "Email занят",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          ["email"]: "Ошибка, попробуйте позже",
        }));
      }
    }
  };
  const fields = [
    { name: "full_name", inputType: "text", maxLength: 60, placeholder: "ФИО" },
    {
      name: "position",
      inputType: "text",
      maxLength: 50,
      placeholder: "Должность",
    },
    { name: "email", inputType: "email", maxLength: 32, placeholder: "Почта" },
    {
      name: "phone",
      inputType: "tel",
      maxLength: 18,
      placeholder: "Номер телефона",
    },
  ];

  return (
    <>
      <div className={styles["main"]}>
        <div className={styles["header"]}>
          <img className={styles["header-logo"]} src={person} />
          <h1 className={styles["header-h1"]}>Анкета сотрудника</h1>
        </div>
        <div className={styles["cards"]}>
          <div className={`${styles["card"]} ${styles["profile"]}`}>
            <CardHeader text="Информация о сотруднике" logo={person} />
            <div className={styles["profile-content"]}>
              <img className={styles["profile-content-img"]} src={company} />
              <div className={styles["profile-content-inputs"]}>
                {fields.map((field) => (
                  <FormField
                    key={field.name}
                    className={styles["form_field-div-input"]}
                    name={field.name}
                    inputType={field.inputType}
                    maxLength={field.maxLength}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    error={errors[field.name]}
                    handleChange={handleChange}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={`${styles["card"]} ${styles["schedule"]}`}>
            <CardHeader text="Расписание смен" logo={calendar} />
            <div className={styles["schedule-content"]}>
              <Calendar days={days} setDays={setDays} />
              <div className={styles["dates"]}>
                <DatesOfWork dates={days} />
              </div>
            </div>
          </div>
          <div className={`${styles["card"]} ${styles["salary"]}`}>
            <CardHeader text="Расчет зарплаты" logo={salary} />
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
                      onChange={(e) =>
                        handleChange("rate_type", e.target.value)
                      }
                    />
                    Часы
                  </label>
                  <label className={styles["form_field-rate_type-label"]}>
                    <input
                      checked={values["rate_type"] == "shift"}
                      type="radio"
                      value="shift"
                      name="rate_type"
                      onChange={(e) =>
                        handleChange("rate_type", e.target.value)
                      }
                    />
                    Смена
                  </label>
                </div>
              </div>
              <div className={styles["amount_of_work"]}>
                <h3 className={styles["salary-h3"]}>Количество</h3>
                <p className={styles["amount_of_work-p"]}>{days.length}</p>
              </div>
              <div className={styles["final_salary"]}>
                <h3 className={styles["salary-h3"]}>Итоговая зарплата</h3>
                <p className={styles["final_salary-p"]}>
                  {days.length * values["rate_amount"]}{" "}
                  {values["currency"] == "RUB"
                    ? "₽"
                    : values["currency"] == "EUR"
                      ? "€"
                      : "$"}
                </p>
              </div>
            </div>
          </div>
          <div className={`${styles["card"]} ${styles["buttons"]}`}>
            <SubmitButton text="Отменить" handleClick={() => setCancel(true)} />
            <SubmitButton
              text="Сохранить"
              disabled={Object.values(errors).some(Boolean)}
              handleClick={() => {
                const newErrors = validation(values);
                setErrors(newErrors);
                if (!Object.values(newErrors).some(Boolean)) {
                  setSave(true);
                }
              }}
            />
          </div>
        </div>
      </div>
      <Dialog
        text="Внимание! Изменения не сохранятся"
        cancelText="Вернуться к добавлению"
        saveText="Отменить"
        handleClick={() => navigate("/employees")}
        isOpen={cancel}
        onClose={() => setCancel(false)}
      />
      <Dialog
        text="Добавить сотрудника?"
        cancelText="Вернуться к добавлению"
        saveText="Добавить"
        handleClick={() => add()}
        isOpen={save}
        onClose={() => setSave(false)}
      />
    </>
  );
}

export default AddEmployee;
