import register_styles from "./Register.module.css";
import edit_information_styles from "./EditInformation.module.css";
import { mail, building, address, person, field } from "./icons.js";
import { useEffect, useState } from "react";
import { useCompany } from "./CompanyContext.jsx";
import { useNavigate } from "react-router";
import FormField from "./FormField/FormField.jsx";
import SelectField from "./SelectField/SelectField.jsx";
import Dialog from "./Dialog/Dialog.jsx";
import SubmitButton from "./SubmitButton/SubmitButton.jsx";

function EditInformation() {
  const { companyData, getCompany, updateCompany } = useCompany();
  const navigate = useNavigate();
  const [values, setValues] = useState(null);
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [save, setSave] = useState(false);

  useEffect(() => {
    const checkCompany = async () => {
      try {
        await getCompany();
      } catch (err) {
        navigate("/login");
      }
    };
    checkCompany();
  }, []);

  useEffect(() => {
    if (companyData) {
      setValues({
        name: companyData.name,
        legal_address: companyData.legal_address,
        contact_name: companyData.contact_name,
        email: companyData.email,
        business_area: companyData.business_area,
        legal_form: companyData.legal_form,
      });
    }
  }, [companyData]);
  if (!values) return <></>;

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

    if (values.name.length == 0) {
      newErrors.name = "Заполните поле";
    }
    if (values.legal_address.length == 0) {
      newErrors.legal_address = "Заполните поле";
    }
    if (values.contact_name.length == 0) {
      newErrors.contact_name = "Заполните поле";
    } else if (!fioRegex.test(values.contact_name)) {
      newErrors.contact_name =
        'Не соответствует формату: "Иванов Иван Иавнович"';
    }
    if (values.email.length == 0) {
      newErrors.email = "Заполните поле";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Адрес некорректен";
    }
    if (values.business_area.length == 0) {
      newErrors.business_area = "Заполните поле";
    }
    return newErrors;
  }

  const patch = async () => {
    try {
      await updateCompany(values);
      setSave(false);
      navigate("/personal_account");
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        ["email"]: "Ошибка, попробуйте позже",
      }));
    }
  };

  const fields = [
    {
      name: "name",
      inputType: "text",
      maxLength: 50,
      placeholder: "Company name",
      logo: building,
    },
    {
      name: "legal_address",
      inputType: "text",
      maxLength: 80,
      placeholder: "Address",
      logo: address,
    },
    {
      name: "contact_name",
      inputType: "text",
      maxLength: 60,
      placeholder: "FIO",
      logo: person,
    },
    {
      name: "email",
      inputType: "email",
      maxLength: 32,
      placeholder: "Contact email",
      logo: mail,
    },
    {
      name: "business_area",
      inputType: "text",
      maxLength: 40,
      placeholder: "Field of activity",
      logo: field,
    },
  ];
  return (
    <>
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
            <SelectField
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
            <div className={edit_information_styles["button-container"]}>
              <SubmitButton
                text="Отменить"
                style={{ display: isEdit ? "block" : "none" }}
                handleClick={() => setCancel(true)}
              />
              <SubmitButton
                text="Сохранить"
                style={{ display: isEdit ? "block" : "none" }}
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
        </form>
        <Dialog
          text="Внимание! Изменения не сохранятся"
          cancelText="Вернуться к изменениям"
          saveText="Отменить"
          handleClick={() => navigate("/personal_account")}
          isOpen={cancel}
          onClose={() => setCancel(false)}
        />
        <Dialog
          text="Сохранить изменения?"
          cancelText="Вернуться к изменениям"
          saveText="Сохранить"
          handleClick={() => patch()}
          isOpen={save}
          onClose={() => setSave(false)}
        />
      </div>
    </>
  );
}

export default EditInformation;
