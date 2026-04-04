import styles from "./Buttons.module.css";
import SubmitButton from "@components/SubmitButton/SubmitButton";
import { validation } from "@utils/validation";

function Buttons({
  mode = "add",
  setCancel,
  setSave,
  setDel,
  setErrors,
  values,
  errors,
}) {
  return (
    <>
      <div
        className={`${styles["card"]} ${styles["buttons"]} ${mode == "add" ? styles["mode-add"] : ""}`}
      >
        <div
          className={`${styles["content"]} ${mode == "dossier" ? styles["mode-dossier"] : ""}`}
        >
          {mode == "dossier" ? (
            <SubmitButton
              text="Удалить"
              handleClick={() => setDel(true)}
              className={`${styles["delete-button"]}`}
            />
          ) : (
            <></>
          )}

          <SubmitButton text="Отменить" handleClick={() => setCancel(true)} />
          <SubmitButton
            text="Сохранить"
            className={`${styles["main-button"]}`}
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
