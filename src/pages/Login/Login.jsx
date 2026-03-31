import styles from "./Login.module.css";
import { useState } from "react";
import FormField from "@components/FormField/FormField";
import PasswordField from "@components/PasswordField/PasswordField";
import SubmitButton from "@components/SubmitButton/SubmitButton";
import { useUser } from "@contexts/UserContext";
import { useNavigate } from "react-router";
import { LOGIN_FIELDS } from "@utils/fields.js";
import { validation } from "@utils/validation.js";
import NoDraggableLink from "@components/NoDraggableLink/NoDraggableLink";
import Title from "@components/Title/Title";

function Login() {
  const data = {
    email: "nikita@yan.ru",
    password: "1",
  };
  const [values, setValues] = useState(data);
  const [errors, setErrors] = useState({});
  const { login } = useUser();
  const navigate = useNavigate();

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  const submit = async () => {
    try {
      await login(values);
      navigate("/personal_account");
    } catch (err) {
      if (err.response.status == 401) {
        setErrors((prev) => ({
          ...prev,
          ["email"]: "Неправильный email или пароль",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          ["email"]: "Ошибка, попробуйте позже",
        }));
      }
    }
  };

  return (
    <>
      <Title text="Вход" />
      <div className={styles["main"]}>
        <h1 className={styles["header-main"]}>Staff Tracker</h1>
        <div className={styles["login"]}>
          <h2 className={styles["header-login"]}>Вход</h2>
          {LOGIN_FIELDS.map((field) => (
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
          <PasswordField
            maxLength={20}
            placeholder="Пароль"
            value={values["password"]}
            error={errors["password"]}
            handleChange={handleChange}
          />
          <div style={{ marginBottom: 30 }}>
            <SubmitButton
              text="Войти"
              disabled={Object.values(errors).some(Boolean)}
              handleClick={() => {
                const newErrors = validation(values);
                setErrors(newErrors);
                if (!Object.values(newErrors).some(Boolean)) {
                  submit();
                }
              }}
            />
          </div>
          <div className={styles.register}>
            Нет аккаунта?{" "}
            <NoDraggableLink to="/register" className={styles["register-link"]}>
              Зарегистрируйтесь
            </NoDraggableLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
