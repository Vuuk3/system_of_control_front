import styles from "./RegisterFields.module.css";

function RegisterFields({ className, header, children }) {
  return (
    <>
      <div className={className}>
        <h3 className={styles["register-h3"]}>{header}</h3>
        {children}
      </div>
    </>
  );
}

export default RegisterFields;
