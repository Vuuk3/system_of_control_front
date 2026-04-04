import styles from "./EditInformation.module.css";
import { useEffect, useState } from "react";
import { useCompany } from "@contexts/CompanyContext";
import { useNavigate } from "react-router";
import FormField from "@components/FormField/FormField";
import SelectField from "@components/SelectField/SelectField";
import Dialog from "@components/Dialog/Dialog";
import SubmitButton from "@components/SubmitButton/SubmitButton";
import { EDIT_FIELDS } from "@utils/fields.js";
import { validation } from "@utils/validation.js";
import Title from "@components/Title/Title";
import RegisterFields from "@components/RegisterFields/RegisterFields";

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
        full_name: companyData.contact_name,
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
      await updateCompany({ ...values, contact_name: values.full_name });
      setSave(false);
      navigate("/personal_account");
    } catch (err) {
      setErrors((prev) => ({ ...prev, email: "Ошибка, попробуйте позже" }));
    }
  };

  return (
    <>
      <Title text="Изменение информации о компании" />
      <div className={styles["main"]}>
        <div className={styles["card"]}>
          <div className={styles["topbar"]}>
            <span className={styles["header-main"]}>Staff Tracker</span>
            <span className={styles["header-label"]}>Редактирование</span>
          </div>

          <div className={styles["scroll"]}>
            <div className={styles["columns"]}>
              <div className={styles["column"]}>
                <h2 className={styles["header-section"]}>Данные о компании</h2>
                <RegisterFields className={styles["fields-group"]}>
                  {EDIT_FIELDS.slice(0, -2).map((field) => (
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
              </div>

              <div className={styles["column"]}>
                <h2 className={styles["header-section"]}>
                  Данные контактного лица
                </h2>
                <RegisterFields className={styles["fields-group"]}>
                  {EDIT_FIELDS.slice(-2).map((field) => (
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
                </RegisterFields>
              </div>
            </div>
          </div>

          <div className={styles["footer"]}>
            <SubmitButton
              className={`${styles["button"]} ${styles["cancel"]}`}
              text="Отменить"
              handleClick={() => setCancel(true)}
            />
            <SubmitButton
              className={`${styles["button"]} ${styles["save"]}`}
              text="Сохранить"
              disabled={!isEdit || Object.values(errors).some(Boolean)}
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
      </div>

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
    </>
  );
}

export default EditInformation;
