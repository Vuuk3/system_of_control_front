import styles from "./Profile.module.css";
import FormField from "@components/FormField/FormField";
import CardHeader from "../CardHeader/CardHeader";
import { EMPLOYEE_FIELDS } from "@utils/fields";
import ImageInput from "@components/ImageInput/ImageInput";
import NoDraggableImg from "@components/NoDraggableImg/NoDraggableImg";

function Profile({
  mode = "add",
  text,
  cardLogo,
  img,
  loadImage,
  handleChange,
  values,
  errors,
}) {
  return (
    <>
      <div className={`${styles["card"]} ${styles["profile"]}`}>
        <CardHeader text={text} logo={cardLogo} />
        <div className={styles["profile-content"]}>
          {mode == "add" ? (
            <ImageInput img={img} loadImage={loadImage} />
          ) : (
            <div>
              <NoDraggableImg
                src={values.avatar_url}
                className={styles["img"]}
              />
            </div>
          )}
          <div className={styles["profile-content-inputs"]}>
            {EMPLOYEE_FIELDS.map((field) => (
              <FormField
                key={field.name}
                className={styles["form_field-div-input"]}
                name={field.name}
                inputType={field.inputType}
                maxLength={field.maxLength}
                placeholder={field.placeholder}
                value={values[field.name] || ""}
                error={errors[field.name]}
                handleChange={handleChange}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
