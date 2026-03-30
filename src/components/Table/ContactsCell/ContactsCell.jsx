import styles from "./ContactsCell.module.css";

function ContactsCell({ phone_number, email }) {
  return (
    <div className={styles["contacts"]}>
      <p className={styles["contacts-phone"]}>{phone_number}</p>
      <p className={styles["contacts-email"]}>{email}</p>
    </div>
  );
}

export default ContactsCell;
