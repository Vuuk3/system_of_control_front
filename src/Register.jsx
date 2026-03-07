import styles from "./Register.module.css";
import { mail, building, address, person, field } from "./icons.js";
import { useState } from "react";
import FormField from "./FormField/FormField";
import PasswordField from "./PasswordField/PasswordField";
import SelectField from "./SelectField/SelectField";
import SubmitButton from "./SubmitButton/SubmitButton";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router";

function validation(values) {
  const newErrors = {};
  const emailRegex = new RegExp(
    "^([A-Za-z0-9._%+-])+@+([a-z0-9.-])+\.[a-z]{2,}$",
  );
  const fioRegex = new RegExp(
    "^[A-ZА-Я][a-zа-я]+(-[A-ZА-Я][a-zа-я]+)?\\s[A-ZА-Я][a-zа-я]+(\\s[A-ZА-Я][a-zа-я]+)?$",
    "u",
  );
  if (values.email.length == 0) {
    newErrors.email = "Заполните поле";
  } else if (!emailRegex.test(values.email)) {
    newErrors.email = "Адрес некорректен";
  }
  if (values.companyName.length == 0) {
    newErrors.companyName = "Заполните поле";
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

function Register() {
  const data = {
    email: "test@yan.ru",
    companyName: "1",
    address: "1",
    fio: "Dd Dd",
    contactEmail: "test@yan.ru",
    field: "1",
    legalForm: "пао",
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
    try {
      await register({
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
      });
      navigate("/login");
    } catch (err) {
      if (err.response.data.detail == "User with this email already exists") {
        setErrors((prev) => ({
          ...prev,
          ["email"]: "Пользователь с таким email уже существует",
        }));
      } else if (
        err.response.data.detail == "Company with this email already exists"
      ) {
        setErrors((prev) => ({
          ...prev,
          ["contactEmail"]: "Компания с таким email уже существует",
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
    {
      name: "companyName",
      inputType: "text",
      maxLength: 50,
      placeholder: "Company name",
      logo: building,
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
      logo: person,
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
    {
      name: "email",
      inputType: "email",
      maxLength: 32,
      placeholder: "Email",
      logo: mail,
    },
  ];
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
          {fields.slice(0, fields.length - 1).map((field) => (
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
            defaultValue={values.legalForm}
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
          {fields.slice(-1).map((field) => (
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
