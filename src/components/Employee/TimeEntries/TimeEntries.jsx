import styles from "./TimeEntries.module.css";

function substractTime(time1, time2) {
  const [hours1, minutes1] = time1.split(":").map(Number);
  const [hours2, minutes2] = time2.split(":").map(Number);
  return hours1 * 60 + minutes1 - (hours2 * 60 + minutes2) < 15;
}

function Times({ entry_time, exit_time }) {
  return (
    <div className={styles["times"]}>
      <div
        className={`${styles["time"]} ${substractTime(entry_time, "08:00") ? styles["on_time"] : styles["not_on_time"]}`}
      >
        <p className={styles["entry_time"]}>{entry_time}</p>
      </div>
      <div
        className={`${styles["time"]} ${substractTime(exit_time, "18:00") ? styles["on_time"] : styles["not_on_time"]}`}
      >
        <p className={styles["exit_time"]}>{exit_time}</p>
      </div>
    </div>
  );
}

function TimeEntry({ date, entry_time, exit_time }) {
  return (
    <div className={styles["time-entry"]}>
      <p className={styles["date"]}>{date}</p>
      <Times entry_time={entry_time} exit_time={exit_time} />
    </div>
  );
}

function TimeEntries({ values }) {
  if (!values) return <></>;
  return (
    <>
      <div className={styles["time-entries"]}>
        <div className={styles["time-entries-wrapper"]}>
          {values.map((value) => (
            <TimeEntry
              key={value.date}
              date={value.date}
              entry_time={value.entry_time}
              exit_time={value.exit_time}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default TimeEntries;
