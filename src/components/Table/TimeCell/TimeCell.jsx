import styles from "./TimeCell.module.css";

function substractTime(time1, time2) {
  const [hours1, minutes1] = time1.split(":").map(Number);
  const [hours2, minutes2] = time2.split(":").map(Number);
  return hours1 * 60 + minutes1 - (hours2 * 60 + minutes2) < 15;
}

function TimeCell({ entry_time, exit_time }) {
  return (
    <div className={styles["times"]}>
      <div className={`${styles["badge"]} ${substractTime(entry_time, "08:00") ? styles["on-time"] : styles["late"]}`}>
        {entry_time}
      </div>
      <span className={styles["separator"]}>—</span>
      <div className={`${styles["badge"]} ${substractTime(exit_time, "18:00") ? styles["on-time"] : styles["late"]}`}>
        {exit_time}
      </div>
    </div>
  );
}
export default TimeCell;