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
  const data = { email: "", password: "" };
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
      if (err.response.status === 401) {
        setErrors((prev) => ({
          ...prev,
          email: "Неправильный email или пароль",
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: "Ошибка, попробуйте позже" }));
      }
    }
  };

  return (
    <>
      <Title text="Вход" />
      <div className={styles["main"]}>
        <div className={styles["login"]}>
          <div className={styles["login-topbar"]}>
            <span className={styles["header-main"]}>Staff Tracker</span>
            <span className={styles["header-label"]}>Вход</span>
          </div>

          <div className={styles["login-body"]}>
            <h2 className={styles["header-section"]}>Данные пользователя</h2>

            <div className={styles["fields-wrapper"]}>
              {LOGIN_FIELDS.map((field) => (
                <FormField
                  key={field.name}
                  name={field.name}
                  inputType={field.inputType}
                  maxLength={field.maxLength}
                  header={field.header}
                  placeholder={field.placeholder}
                  logo={field.logo}
                  value={values[field.name]}
                  error={errors[field.name]}
                  handleChange={handleChange}
                />
              ))}
              <PasswordField
                maxLength={20}
                header="Пароль"
                placeholder="Минимум 8 символов"
                value={values["password"]}
                error={errors["password"]}
                handleChange={handleChange}
              />
            </div>
          </div>

          <div className={styles["login-footer"]}>
            <div className={styles["register"]}>
              Нет аккаунта?{" "}
              <NoDraggableLink
                to="/register"
                className={styles["register-link"]}
              >
                Зарегистрируйтесь
              </NoDraggableLink>
            </div>
            <SubmitButton
              className={styles["button"]}
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
        </div>
      </div>
    </>
  );
}

export default Login;
