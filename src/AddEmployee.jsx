import styles from "./AddEmployee.module.css";
import edit_information_styles from "./EditInformation.module.css";
import fio from "./assets/fio.svg";
import contacts from "./assets/contacts.svg";
import calendar from "./assets/calendar.svg";
import salary from "./assets/salary.svg";
import company from "./assets/company.jpg";
import { useState, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { ru } from "date-fns/locale";

function FormField({
  name,
  inputType,
  maxLength,
  placeholder,
  value,
  error,
  handleChange,
}) {
  return (
    <div className={styles["form_field"]} name={name}>
      <div className={styles["form_field-div"]}>
        <input
          type={inputType}
          maxLength={maxLength}
          className={
            error == "" || error == null
              ? styles["form_field-div-input"]
              : `${styles["form_field-div-input"]} ${styles["incorrect"]}`
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(name, e.target.value)}
          required
        />
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

function CardHeader({ text, logo }) {
  return (
    <div className={styles["card_header"]}>
      <img className={styles["card_header-logo"]} src={logo} />
      <h2 className={styles["card_header-h2"]}>{text}</h2>
    </div>
  );
}

function Calendar({ days, setDays }) {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleClick(days) {
    if (!days) return;
    setDays(days.sort((a, b) => a.getTime() - b.getTime()));
  }

  const [month, setMonth] = useState(new Date());
  const [isCurrentMonth, setIsCurrentMonth] = useState(true);
  const prevMonth = new Date(month.getFullYear(), month.getMonth() - 1);
  const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1);
  const today = new Date().setHours(0, 0, 0, 0);

  return (
    <>
      <DayPicker
        mode="multiple"
        showOutsideDays={true}
        selected={days}
        onSelect={handleClick}
        disabled={{ before: today }}
        month={month}
        onMonthChange={setMonth}
        locale={ru}
        classNames={{
          day: styles["day"],
          day_button: styles["day_button"],
          selected: styles["selected"],
          disabled: styles["disabled"],
          month_grid: styles["month_grid"],
          month: styles["month"],
          weekday: styles["weekday"],
        }}
        formatters={{
          formatCaption: (date) =>
            capitalize(
              new Intl.DateTimeFormat("ru-RU", {
                month: "long",
                year: "numeric",
              }).format(date),
            ),
          formatWeekdayName: (date) =>
            capitalize(
              new Intl.DateTimeFormat("ru-RU", {
                weekday: "short",
              }).format(date),
            ),
        }}
        components={{
          MonthCaption: () => (
            <div className={styles["calendar-nav"]}>
              <button
                className={styles["calendar-nav-button"]}
                onClick={() => {
                  setMonth(prevMonth);
                  setIsCurrentMonth(true);
                }}
                style={{ visibility: isCurrentMonth ? "visible" : "visible" }}
              >
                ‹
              </button>
              <p className={styles["calendar-nav-p"]}>
                {capitalize(
                  new Intl.DateTimeFormat("ru-RU", {
                    month: "long",
                    year: "numeric",
                  }).format(month),
                )}
              </p>
              <button
                className={styles["calendar-nav-button"]}
                onClick={() => {
                  setMonth(nextMonth);
                  setIsCurrentMonth(false);
                }}
                style={{ visibility: isCurrentMonth ? "visible" : "hidden" }}
              >
                ›
              </button>
            </div>
          ),
          Nav: () => null,
        }}
      />
    </>
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
    fio: "Dd Dd",
    phone: "",
    position: "",
    rate_type: "hourly",
    rate_amount: 0,
    currency: "₽",
  };
  const [values, setValues] = useState(data);
  const [errors, setErrors] = useState({});
  const [days, setDays] = useState([]);
  const cancelRef = useRef(null);
  const saveRef = useRef(null);

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
    if (values.fio.length == 0) {
      newErrors.fio = "Заполните поле";
    } else if (!fioRegex.test(values.fio)) {
      newErrors.fio = 'Не соответствует формату: "Иванов Иван Иавнович"';
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
    }
    if (values.rate_amount.length == 0) {
      newErrors.rate_amount = "Заполните поле";
    }
    return newErrors;
  }

  function submit() {
    const URL = "http://localhost:8001/api/auth/register";
    const data = {
      email: values.email,
      password: values.password,
      company: {
        name: values.companyName,
        legal_form: values.legalForm,
        legal_address: values.address,
        contact_name: values.fio,
        business_area: values.field,
        email: values.contactEmail,
      },
    };
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((answer) =>
        answer.detail == "Registered successfully"
          ? (window.location.pathname = "/login")
          : answer.detail == "Company with this email already exists"
            ? setErrors((prev) => ({
                ...prev,
                contactEmail: "Компания с таким email уже существует",
              }))
            : setErrors((prev) => ({
                ...prev,
                email: "Пользователь с таким email уже существует",
              })),
      )
      .catch(() => {});
  }
  return (
    <>
      <div className={styles["main"]}>
        <form noValidate>
          <div className={styles["header"]}>
            <img className={styles["header-logo"]} src={fio} />
            <h1 className={styles["header-h1"]}>Анкета сотрудника</h1>
          </div>
          <div className={styles["cards"]}>
            <div className={`${styles["card"]} ${styles["profile"]}`}>
              <CardHeader text="Информация о сотруднике" logo={fio} />
              <div className={styles["profile-content"]}>
                <img className={styles["profile-content-img"]} src={company} />
                <FormField
                  name="fio"
                  inputType="text"
                  maxLength={60}
                  placeholder="ФИО"
                  value={values["fio"]}
                  error={errors["fio"]}
                  handleChange={handleChange}
                />
                <FormField
                  name="position"
                  inputType="text"
                  maxLength={50}
                  placeholder="Должность"
                  value={values["position"]}
                  error={errors["position"]}
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className={`${styles["card"]} ${styles["contacts"]}`}>
              <CardHeader text="Контактные данные" logo={contacts} />
              <div className={styles["contacts-content"]}>
                <FormField
                  name="email"
                  inputType="email"
                  maxLength={32}
                  placeholder="Почта"
                  value={values["email"]}
                  error={errors["email"]}
                  handleChange={handleChange}
                />
                <FormField
                  name="phone"
                  inputType="tel"
                  maxLength={18}
                  placeholder="Номер телефона"
                  value={values["phone"]}
                  error={errors["phone"]}
                  handleChange={handleChange}
                />
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
                  name="rate_amount"
                  inputType="number"
                  placeholder="Ставка"
                  value={values["rate_amount"]}
                  error={errors["rate_amount"]}
                  handleChange={handleChange}
                />
                <div className={styles["form_field-select"]}>
                  <select
                    className={styles["select"]}
                    defaultValue={values.currency}
                    onChange={(e) => {
                      handleChange("currency", e.target.value);
                    }}
                  >
                    <option value="₽">Рубли</option>
                    <option value="€">Евро</option>
                    <option value="$">Доллары</option>
                  </select>
                </div>
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
                    {days.length * values["rate_amount"]} {values["currency"]}
                  </p>
                </div>
              </div>
            </div>
            <div className={`${styles["card"]} ${styles["buttons"]}`}>
              <button
                type="button"
                className={styles["button"]}
                onClick={() => cancelRef.current.showModal()}
              >
                Отмена
              </button>
              <button
                type="button"
                className={styles["button"]}
                disabled={Object.values(errors).some(Boolean)}
                onClick={() => {
                  setErrors(validation(values));
                  console.log(errors);
                  !Object.values(errors).some(Boolean)
                    ? saveRef.current.showModal()
                    : null;
                }}
              >
                Создать
              </button>
            </div>
          </div>
          <dialog
            ref={cancelRef}
            className={edit_information_styles["cancel_dialog"]}
          >
            <div className={edit_information_styles["cancel_dialog-content"]}>
              <p className={edit_information_styles["cancel_dialog-header"]}>
                Внимание! Изменения не сохранятся
              </p>
              <div className={edit_information_styles["button-container"]}>
                <button
                  className={edit_information_styles["dialog-button"]}
                  onClick={() => cancelRef.current.close()}
                >
                  Вернуться к изменениям
                </button>
                <a
                  className={`${edit_information_styles["dialog-button"]} ${edit_information_styles["main-button"]}`}
                  href="/employees"
                >
                  Выйти
                </a>
              </div>
            </div>
          </dialog>
          <dialog
            ref={saveRef}
            className={edit_information_styles["save_dialog"]}
          >
            <div className={edit_information_styles["save_dialog-content"]}>
              <p className={edit_information_styles["save_dialog-header"]}>
                Сохранить изменения?
              </p>
              <div className={edit_information_styles["button-container"]}>
                <button
                  className={edit_information_styles["dialog-button"]}
                  onClick={() => saveRef.current.close()}
                >
                  Вернуться к изменениям
                </button>
                <button
                  className={`${edit_information_styles["dialog-button"]} ${edit_information_styles["main-button"]}`}
                  onClick={() => save()}
                >
                  Сохранить
                </button>
              </div>
            </div>
          </dialog>
        </form>
      </div>
    </>
  );
}

export default AddEmployee;
