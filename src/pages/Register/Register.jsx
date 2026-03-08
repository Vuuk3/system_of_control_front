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
function Register() {
  const data = {
    user_email: "test@yan.ru",
    name: "1",
    legal_address: "1",
    contact_name: "Dd Dd",
    email: "test@yan.ru",
    business_area: "1",
    legal_form: "пао",
    password: "1",
  };
  const [values, setValues] = useState(data);
  const [errors, setErrors] = useState({});
  const { register } = useUser();
  const navigate = useNavigate();

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  const submit = async () => {
    const { user_email, password, ...companyData } = values;
    try {
      await register({
        email: user_email,
        password,
        company: companyData,
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
      } else {
        setErrors((prev) => ({
          ...prev,
          ["user_email"]: "Ошибка, попробуйте позже",
        }));
      }
    }
  };

  return (
    <div className={styles["main"]}>
      <form
        noValidate
        method="post"
        className={styles["login"]}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <h5 className={styles["header-login"]}>Registration</h5>
        <div className={styles["login__scroll"]}>
          {REGISTER_FIELDS.slice(0, REGISTER_FIELDS.length - 1).map((field) => (
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
            name="legalForm"
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
          {REGISTER_FIELDS.slice(-1).map((field) => (
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
          <div style={{ marginBottom: 50 }}>
            <SubmitButton
              text="Register"
              disabled={Object.values(errors).some(Boolean)}
              handleClick={() => setErrors(validation(values))}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
export default Register;
