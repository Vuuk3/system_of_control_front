import styles from "./Dialog.module.css";

function Dialog({ text, cancelText, saveText, handleClick, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <dialog className={styles["dialog"]} open={true}>
      <div className={styles["dialog-content"]}>
        <p className={styles["dialog-header"]}>{text}</p>
        <div className={styles["button-container"]}>
          <button className={styles["dialog-button"]} onClick={onClose}>
            {cancelText}
          </button>
          <button
            className={`${styles["dialog-button"]} ${styles["main-button"]}`}
            onClick={handleClick}
          >
            {saveText}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Dialog;
