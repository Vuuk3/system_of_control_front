import styles from "./SubmitButton.module.css";

export default function SubmitButton({ text, style, disabled, handleClick }) {
  return (
    <>
      <button
        type="submit"
        style={style}
        className={styles["button"]}
        disabled={disabled}
        onClick={() => {
          handleClick();
        }}
      >
        {text}
      </button>
    </>
  );
}
