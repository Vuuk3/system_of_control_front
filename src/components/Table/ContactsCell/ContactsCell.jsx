import styles from "./ContactsCell.module.css";

function ContactsCell({ phone_number, email }) {
  return (
    <div className={styles["contacts"]}>
      <p className={styles["phone"]}>{phone_number}</p>
      <p className={styles["email"]}>{email}</p>
    </div>
  );
}
export default ContactsCell;