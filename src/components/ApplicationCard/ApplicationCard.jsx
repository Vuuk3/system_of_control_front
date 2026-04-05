import styles from "./ApplicationCard.module.css";
import NoDraggableLink from "@components/NoDraggableLink/NoDraggableLink";
import { VALUTA } from "@utils/valuta";

function ApplicationCard({ data }) {
  return (
    <NoDraggableLink 
      to={`/applications/${data.id}`} 
      target="_blank"
      rel="noopener noreferrer"
      className={styles["card"]}
    >
      <div className={styles["info-group"]}>
        <div className={styles["avatar-placeholder"]}>
          {data.full_name.charAt(0)}
        </div>
        <div className={styles["main-info"]}>
          <h3 className={styles["name"]}>{data.full_name}</h3>
          <p className={styles["position"]}>{data.expected_position}</p>
        </div>
      </div>
      
      <div className={styles["contacts"]}>
        <p className={styles["phone"]}>{data.phone}</p>
        <p className={styles["email"]}>{data.email}</p>
      </div>

      <div className={styles["salary-badge"]}>
        {data.expected_salary} {VALUTA[data.currency]}
      </div>
    </NoDraggableLink>
  );
}

export default ApplicationCard;