import register_styles from "../Register/Register.module.css";
import edit_information_styles from "./EditInformation.module.css";
import { useEffect, useState } from "react";
import { useCompany } from "@contexts/CompanyContext";
import { useNavigate } from "react-router";
import FormField from "@components/FormField/FormField";
import SelectField from "@components/SelectField/SelectField";
import Dialog from "@components/Dialog/Dialog";
import SubmitButton from "@components/SubmitButton/SubmitButton";
import { EDIT_FIELDS } from "@utils/fields.js";
import { validation } from "@utils/validation.js";

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
            {EDIT_FIELDS.map((field) => (
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
            <div
              className={edit_information_styles["button-container"]}
              style={{ marginBottom: 20 }}
            >
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
