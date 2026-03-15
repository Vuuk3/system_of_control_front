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
        <div className={styles["content"]}>
          <SubmitButton
            text="Отменить"
            className={`${styles["button"]} ${styles["left"]}`}
            handleClick={() => setCancel(true)}
          />
          <SubmitButton
            text="Сохранить"
            className={styles["button"]}
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
    </>
  );
}

export default Buttons;
