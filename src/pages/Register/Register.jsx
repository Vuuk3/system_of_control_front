import styles from "./Register.module.css";
import { useState } from "react";
import FormField from "@components/FormField/FormField";
import PasswordField from "@components/PasswordField/PasswordField";
import SelectField from "@components/SelectField/SelectField";
import SubmitButton from "@components/SubmitButton/SubmitButton";
import { useUser } from "@contexts/UserContext";
import { useNavigate } from "react-router";
import { REGISTER_FIELDS } from "@utils/fields.js";
import { validation } from "@utils/validation.js";
import Title from "@components/Title/Title";
import RegisterFields from "@components/RegisterFields/RegisterFields";

function Register() {
  const data = {
    name: "1",
    legal_address: "1",
    contact_surname: "Dd",
    contact_name: "Dd",
    contact_patronymic: "",
    email: "test@yan.ru",
    business_area: "1",
    legal_form: "пао",
  };
  const user_data = {
    user_email: "",
    password: "",
  };
  const [values, setValues] = useState(data);
  const [userValues, setUserValues] = useState(user_data);
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(true);
  const { register } = useUser();
  const navigate = useNavigate();

  function handleChange(name, value) {
    if (name in values) {
      setValues((prev) => ({ ...prev, [name]: value }));
    } else {
      setUserValues((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  const submit = async () => {
    const {
      contact_name,
      contact_surname,
      contact_patronymic,
      ...companyData
    } = values;

    const { user_email, password } = userValues;
    console.log(
      `${contact_surname} ${contact_name}${contact_patronymic != "" ? ` ${contact_patronymic}` : ""}`,
    );
    console.log({
      email: user_email,
      password,
      company: { contact_name: contact_name, ...companyData },
    });

    try {
      await register({
        email: user_email,
        password,
        company: {
          contact_name: `${contact_surname} ${contact_name}${contact_patronymic ? ` ${contact_patronymic}` : ""}`,
          ...companyData,
        },
      });
      navigate("/login");
    } catch (err) {
      if (err.response.data.detail == "User with this email already exists") {
        setErrors((prev) => ({
          ...prev,
          ["user_email"]: "Пользователь с таким email уже существует",
        }));
      } else if (
        err.response.data.detail == "Company with this email already exists"
      ) {
        setErrors((prev) => ({
          ...prev,
          ["email"]: "Компания с таким email уже существует",
        }));
        setPage(true);
      } else {
        setErrors((prev) => ({
          ...prev,
          ["user_email"]: "Ошибка, попробуйте позже",
        }));
      }
    }
  };

  return (
    <>
      <Title text="Регистрация" />
      <div className={styles["main"]}>
        <h1 className={styles["header-main"]}>Staff Tracker</h1>
        <div className={styles["register"]}>
          <div className={styles["register-scroll"]}>
            <h2 className={styles["header-login"]}>Регистрация</h2>
            {page ? (
              <RegisterFields
                header="Данные о компании"
                className={styles["company-info"]}
              >
                {REGISTER_FIELDS.slice(0, 3).map((field) => (
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
                <SelectField
                  placeholder="Организационно-правовая форма"
                  name="legal_form"
                  defaultValue={values.legal_form}
                  handleChange={handleChange}
                  options={[
                    { value: "ооо", text: "ООО" },
                    { value: "ип", text: "ИП" },
                    { value: "ао", text: "АО" },
                    { value: "пао", text: "ПАО" },
                    { value: "нао", text: "НАО" },
                    { value: "гуп", text: "ГУП" },
                    { value: "муп", text: "МУП" },
                    { value: "нко", text: "НКО" },
                  ]}
                />
              </RegisterFields>
            ) : (
              <></>
            )}
            {page ? (
              <RegisterFields
                header="Данные контактного лица"
                className={styles["contact-info"]}
              >
                {REGISTER_FIELDS.slice(3, -1).map((field) => (
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
              </RegisterFields>
            ) : (
              <></>
            )}
            {!page ? (
              <RegisterFields
                header="Данные пользователя"
                className={styles["manager-info"]}
              >
                {REGISTER_FIELDS.slice(-1).map((field) => (
                  <FormField
                    key={field.name}
                    name={field.name}
                    inputType={field.inputType}
                    maxLength={field.maxLength}
                    placeholder={field.placeholder}
                    logo={field.logo}
                    value={userValues[field.name]}
                    error={errors[field.name]}
                    handleChange={handleChange}
                  />
                ))}
                <PasswordField
                  maxLength={20}
                  placeholder="Пароль"
                  value={userValues["password"]}
                  error={errors["password"]}
                  handleChange={handleChange}
                />
              </RegisterFields>
            ) : (
              <></>
            )}
            <SubmitButton
              className={`${styles["button"]} ${page ? styles["next"] : styles["prev"]}`}
              text={page ? "Далее" : "Назад"}
              disabled={page ? Object.values(errors).some(Boolean) : false}
              handleClick={() => {
                const newErrors = validation(values);
                setErrors(newErrors);
                if (!Object.values(newErrors).some(Boolean) || !page) {
                  setPage((x) => !x);
                }
              }}
            />
            {!page ? (
              <SubmitButton
                className={`${styles["button"]} ${styles["main-button"]}`}
                text="Регистрация"
                disabled={Object.values(errors).some(Boolean)}
                handleClick={() => {
                  const newErrors = validation(userValues);
                  setErrors(newErrors);
                  if (!Object.values(newErrors).some(Boolean)) {
                    submit();
                  }
                }}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
