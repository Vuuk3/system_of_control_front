import styles from "./Schedule.module.css";
import CardHeader from "../CardHeader/CardHeader";
import Calendar from "../../Calendar/Calendar";
import DatesOfWork from "../DatesOfWork/DatesOfWork";

function Schedule({ text, cardLogo, days, setDays, setEdit }) {
  return (
    <>
      <div className={`${styles["card"]} ${styles["schedule"]}`}>
        <CardHeader text={text} logo={cardLogo} />
        <div className={styles["schedule-content"]}>
          <Calendar days={days} setDays={setDays} setEdit={setEdit} />
          <div className={styles["dates"]}>
            <DatesOfWork dates={days} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Schedule;
