import styles from "./DatesOfWork.module.css";

const rate_type = { hourly: "ч", shift: "с" };

function DateOfWork({ day }) {
  return (
    <div className={styles["date"]}>
      <p className={styles["date-p"]}>
        {new Intl.DateTimeFormat("ru-RU", {
          day: "2-digit",
          month: "long",
        }).format(new Date(day.date))}{" "}
        {day.rate_amount}
        {"/"}
        {rate_type[day.rate_type]}
      </p>
      <div className={styles["time"]}>
        <input
          type="text"
          className={styles["time-input"]}
          value={day.start_time ? day.start_time.slice(0, 5) : "08:00"}
          maxLength={5}
          readOnly={true}
        />
        <span>-</span>
        <input
          type="text"
          className={styles["time-input"]}
          value={day.end_time ? day.end_time.slice(0, 5) : "18:00"}
          maxLength={5}
          readOnly={true}
        />
      </div>
    </div>
  );
}

function DatesOfWork({ dates }) {
  return (
    <>
      <div className={styles["dates-wrapper"]}>
        {dates.map((date) => (
          <DateOfWork key={date.date} day={date} />
        ))}
      </div>
    </>
  );
}

export default DatesOfWork;
