import styles from "./SubmitButton.module.css";

export default function SubmitButton({
  text,
  disabled,
  handleClick,
  className,
}) {
  return (
    <>
      <button
        type="submit"
        className={`${styles["button"]} ${className}`}
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
