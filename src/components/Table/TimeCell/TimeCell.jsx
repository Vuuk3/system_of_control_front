import styles from "./TimeCell.module.css";

function substractTime(time1, time2) {
  const [hours1, minutes1] = time1.split(":").map(Number);
  const [hours2, minutes2] = time2.split(":").map(Number);
  return hours1 * 60 + minutes1 - (hours2 * 60 + minutes2) < 15;
}

function TimeCell({ entry_time, exit_time }) {
  return (
    <div className={styles["times"]}>
      <div className={`${styles["time"]} ${substractTime(entry_time, "08:00") ? styles["on_time"] : styles["not_on_time"]}`}>
        {entry_time}
      </div>
      <span className={styles["separator"]}>—</span>
      <div className={`${styles["time"]} ${substractTime(exit_time, "18:00") ? styles["on_time"] : styles["not_on_time"]}`}>
        {exit_time}
      </div>
    </div>
  );
}

export default TimeCell;