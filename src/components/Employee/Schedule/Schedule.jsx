import styles from "./Schedule.module.css";
import CardHeader from "../CardHeader/CardHeader";
import Calendar from "@components/Calendar/Calendar";
import DatesOfWork from "../DatesOfWork/DatesOfWork";
import { useRef } from "react";

function Schedule({ text, cardLogo, days, setDays, setEdit, rate_amount, rate_type }) {
  const calendarRef = useRef(null);

  return (
    <div className={`${styles["card"]} ${styles["schedule"]}`}>
      <CardHeader text={text} logo={cardLogo} />
      <div className={styles["schedule-content"]}>
        <div className={styles["calendar-wrapper"]} ref={calendarRef}>
          <Calendar
            days={days}
            setDays={setDays}
            setEdit={setEdit}
            rate_amount={rate_amount}
            rate_type={rate_type}
          />
        </div>
        <div className={styles["dates"]}>
          <DatesOfWork dates={days} calendarRef={calendarRef} />
        </div>
      </div>
    </div>
  );
}

export default Schedule;