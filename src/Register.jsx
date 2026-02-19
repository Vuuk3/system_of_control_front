import styles from "./Register.module.css";
import mail from "./assets/mail.svg";
import building from "./assets/building.svg";
import inn from "./assets/inn.svg";
import address from "./assets/address.svg";
import fio from "./assets/fio.svg";
import field from "./assets/field.svg";
import eye from "./assets/eye.svg";
import eyeSlash from "./assets/eye-slash.svg";
import { useState } from "react";

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

function Register() {
  const [values, setValues] = useState({
    email: "",
    companyName: "",
    inn: "",
    address: "",
    fio: "",
    contactEmail: "",
    field: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validation(values) {
    const newErrors = {};
    const emailRegex = new RegExp(
      "^([A-Za-z0-9._%+-])+@+([a-z0-9.-])+\.[a-z]{2,}$",
    );
    const innRegex = new RegExp("^[0-9]{10}$");
    const fioRegex = new RegExp(
      "^[A-ZА-Я]{1}[a-zа-я]+(-[A-ZА-Я]{1}[a-zа-я]+)?\s[A-ZА-Я]{1}[a-zа-я]+(\s[A-ZА-Я]{1}[a-zа-я]+)?$",
    );
    if (values.email.length == 0) {
      newErrors.email = "Заполните поле";
    } else if (!emailRegex.test(values.email)) {
      console.log(1);
      newErrors.email = "Адрес некорректен";
    }
    if (values.companyName.length == 0) {
      newErrors.companyName = "Заполните поле";
    }
    if (values.inn.length == 0) {
      newErrors.inn = "Заполните поле";
    } else if (!innRegex.test(values.inn)) {
      newErrors.inn = "Не соответсвует формату";
    }
    if (values.address.length == 0) {
      newErrors.address = "Заполните поле";
    }
    if (values.fio.length == 0) {
      newErrors.fio = "Заполните поле";
    } else if (!fioRegex.test(values.fio)) {
      newErrors.fio = 'Не соответствует формату: "Иванов Иван Иавнович"';
    }
    if (values.contactEmail.length == 0) {
      newErrors.contactEmail = "Заполните поле";
    } else if (!emailRegex.test(values.contactEmail)) {
      newErrors.contactEmail = "Адрес некорректен";
    }
    if (values.field.length == 0) {
      newErrors.field = "Заполните поле";
    }
    if (values.password.length == 0) {
      newErrors.password = "Заполните поле";
    }
    return newErrors;
  }

  const fields = [
    {
      name: "email",
      inputType: "email",
      maxLength: 32,
      placeholder: "Email",
      logo: mail,
    },
    {
      name: "companyName",
      inputType: "text",
      maxLength: 50,
      placeholder: "Company name",
      logo: building,
    },
    {
      name: "inn",
      inputType: "text",
      maxLength: 10,
      placeholder: "INN",
      logo: inn,
    },
    {
      name: "address",
      inputType: "text",
      maxLength: 80,
      placeholder: "Address",
      logo: address,
    },
    {
      name: "fio",
      inputType: "text",
      maxLength: 60,
      placeholder: "FIO",
      logo: fio,
    },
    {
      name: "contactEmail",
      inputType: "email",
      maxLength: 32,
      placeholder: "Contact email",
      logo: mail,
    },
    {
      name: "field",
      inputType: "text",
      maxLength: 40,
      placeholder: "Field of activity",
      logo: field,
    },
  ];
  return (
    <div className={styles["main"]}>
      <form noValidate method="post" className={styles["login"]}>
        <div className={styles["login__scroll"]}>
          <h5 className={styles["header-login"]}>Registration</h5>
          {fields.slice(1, 6).map((field) => (
            <FormField
              key={field.name}
              name={field.name}
              inputType={field.inputType}
              maxLength={field.maxLength}
              placeholder={field.placeholder}
              logo={field.logo}
              value={values[field.name]}
              error={errors[field.name]}
              handleChange={handleChange}
            />
          ))}
          <div className={styles["form__field"]}>
            <div className={styles["form__field-select"]}>
              <select className={styles["select"]}>
                <option value="ооо">ООО</option>
                <option value="ип">ИП</option>
                <option value="ао">АО</option>
                <option value="пао">ПАО</option>
                <option value="нао">НАО</option>
                <option value="гуп">ГУП</option>
                <option value="муп">МУП</option>
                <option value="нко">НКО</option>
              </select>
            </div>
          </div>
          {fields.slice(0, 1).map((field) => (
            <FormField
              key={field.name}
              name={field.name}
              inputType={field.inputType}
              maxLength={field.maxLength}
              placeholder={field.placeholder}
              logo={field.logo}
              value={values[field.name]}
              error={errors[field.name]}
              handleChange={handleChange}
            />
          ))}

          <div className={styles["form__field"]}>
            <div className={styles["form__field-div"]}>
              <input
                type={showPassword ? "password" : "text"}
                maxLength={20}
                className={
                  errors.password == "" || errors.password == null
                    ? styles["form__field-div-input"]
                    : `${styles["form__field-div-input"]} ${styles["incorrect"]}`
                }
                placeholder="Password"
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
              <img
                src={showPassword ? eyeSlash : eye}
                className={styles["password-icon"]}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            </div>
            <span
              className={styles["error"]}
              style={{ visibility: errors.password == "" ? "none" : "visible" }}
            >
              {errors.password}
            </span>
          </div>

          <button
            type="submit"
            className={styles["register-button"]}
            disabled={Object.values(errors).some(Boolean)}
            onClick={() => {
              setErrors(validation(values));
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
