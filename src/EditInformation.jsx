import register_styles from "./Register.module.css";
import edit_information_styles from "./EditInformation.module.css";
import mail from "./assets/mail.svg";
import building from "./assets/building.svg";
import address from "./assets/address.svg";
import fio from "./assets/fio.svg";
import field from "./assets/field.svg";
import { useRef, useState } from "react";
import { useUser } from "./UserContext.jsx";

function EditInformation() {
  const { userData } = useUser();
  if (userData.detail == "Not authenticated") {
    window.location.pathname = "/login";
  }
  if (Object.keys(userData).length == 0) {
    return <></>;
  }
  return <Editing props={userData.company} />;
}

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
    <div className={register_styles["form__field"]}>
      <div className={register_styles["form__field-div"]}>
        <input
          type={inputType}
          maxLength={maxLength}
          className={
            error == "" || error == null
              ? register_styles["form__field-div-input"]
              : `${register_styles["form__field-div-input"]} ${register_styles["incorrect"]}`
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(name, e.target.value)}
          required
        />
        <img src={logo} className={register_styles["icon"]} />
      </div>
      <span
        className={register_styles["error"]}
        style={{ visibility: error == "" ? "none" : "visible" }}
      >
        {error}
      </span>
    </div>
  );
}

function Editing({ props }) {
  const data = {
    companyName: props.name,
    address: props.legal_address,
    fio: props.contact_name,
    contactEmail: props.email,
    field: props.business_area,
    legalForm: props.legal_form,
  };
  const [values, setValues] = useState(data);
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const cancelRef = useRef(null);
  const saveRef = useRef(null);

  function handleChange(name, value) {
    setIsEdit(true);
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

    return newErrors;
  }

  function save() {
    const URL = "http://localhost:8001/api/company";
    const data = {
      name: values.companyName,
      logo: null,
      legal_form: values.legalForm,
      legal_address: values.address,
      contact_name: values.fio,
      business_area: values.field,
      email: values.contactEmail,
    };
    fetch(URL, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => (window.location.pathname = "/personal_account"))
      .catch(() => {});
  }

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
    <div className={register_styles["main"]}>
      <form
        noValidate
        method="post"
        className={register_styles["login"]}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h5 className={register_styles["header-login"]}>Editing</h5>
        <div className={register_styles["login__scroll"]}>
          {fields.map((field) => (
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
          <div className={register_styles["form__field"]}>
            <div className={register_styles["form__field-select"]}>
              <select
                className={register_styles["select"]}
                defaultValue={values.legalForm}
                onChange={(e) => {
                  handleChange("legalForm", e.target.value);
                }}
              >
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
          <div className={edit_information_styles["button-container"]}>
            <button
              type="button"
              style={{ display: isEdit ? "block" : "none" }}
              className={register_styles["register-button"]}
              onClick={() => cancelRef.current.showModal()}
            >
              Отменить
            </button>
            <button
              style={{ display: isEdit ? "block" : "none" }}
              type="button"
              className={register_styles["register-button"]}
              disabled={Object.values(errors).some(Boolean)}
              onClick={() => {
                setErrors(validation(values));
                !Object.values(errors).some(Boolean)
                  ? saveRef.current.showModal()
                  : null;
              }}
            >
              Сохранить
            </button>
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
                  href="/personal_account"
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
        </div>
      </form>
    </div>
  );
}

export default EditInformation;
