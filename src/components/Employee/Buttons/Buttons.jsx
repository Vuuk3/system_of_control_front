import styles from "./Buttons.module.css";
import SubmitButton from "@components/SubmitButton/SubmitButton";
import { validation } from "@utils/validation";

function Buttons({ isEdit, setCancel, setSave, setErrors, values, errors }) {
  return (
    <>
      <div
        className={`${styles["card"]} ${styles["buttons"]}`}
        style={{ visibility: isEdit ? "visible" : "hidden" }}
      >
        <SubmitButton text="Отменить" handleClick={() => setCancel(true)} />
        <SubmitButton
          text="Сохранить"
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
    </>
  );
}

export default Buttons;
