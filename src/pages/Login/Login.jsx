import styles from "./Login.module.css";
import { useState } from "react";
import FormField from "@components/FormField/FormField";
import PasswordField from "@components/PasswordField/PasswordField";
import SubmitButton from "@components/SubmitButton/SubmitButton";
import { useUser } from "@contexts/UserContext";
import { useNavigate } from "react-router";
import { LOGIN_FIELDS } from "@utils/fields.js";
import { validation } from "@utils/validation.js";

function Login() {
  const data = {
    email: "test@yan.ru",
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
    <div className={styles["main"]}>
      <form
        noValidate
        method="post"
        className={styles.login}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <h5 className={styles["header-login"]}>Login</h5>
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
          placeholder="Password"
          value={values["password"]}
          error={errors["password"]}
          handleChange={handleChange}
        />
        <div style={{ marginBottom: 30 }}>
          <SubmitButton
            text="Login"
            disabled={Object.values(errors).some(Boolean)}
            handleClick={() => setErrors(validation(values))}
          />
        </div>
        <div className={styles.register}>
          Don`t have an account?{" "}
          <a href="/register" className={styles["register-link"]}>
            Register
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
