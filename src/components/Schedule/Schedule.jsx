import styles from "./Schedule.module.css";
import CardHeader from "@components/CardHeader/CardHeader";
import Calendar from "@components/Calendar/Calendar";
import DatesOfWork from "@components/DatesOfWork/DatesOfWork";

function Schedule({
  text,
  cardLogo,
  days,
  setDays = null,
  setEdit,
  rate_amount,
  rate_type,
  className = "",
}) {
  return (
    <>
      <div className={`${styles["card"]} ${styles["schedule"]} ${className}`}>
        <CardHeader text={text} logo={cardLogo} />
        <div className={styles["schedule-content"]}>
          <Calendar
            days={days}
            setDays={setDays}
            setEdit={setEdit}
            rate_amount={rate_amount}
            rate_type={rate_type}
          />
          <div className={styles["dates"]}>
            <DatesOfWork dates={days} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Schedule;
