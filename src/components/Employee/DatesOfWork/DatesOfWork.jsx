import styles from "./DatesOfWork.module.css";
import { useEffect, useRef, useState } from "react";

function DateOfWork({ day }) {
  return (
    <div className={styles["date"]}>
      <p className={styles["date-p"]}>
        {new Intl.DateTimeFormat("ru-RU", {
          day: "2-digit",
          month: "long",
        }).format(new Date(day.date))}
      </p>
      <div className={styles["time"]}>
        <input
          type="text"
          className={styles["time-input"]}
          value={day.start_time ? day.start_time.slice(0, 5) : "08:00"}
          maxLength={5}
          readOnly={true}
        />
        <span>—</span>
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

function DatesOfWork({ dates, calendarRef }) {
  const [maxHeight, setMaxHeight] = useState(null);

  useEffect(() => {
    if (!calendarRef?.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMaxHeight(entry.contentRect.height);
      }
    });

    observer.observe(calendarRef.current);
    return () => observer.disconnect();
  }, [calendarRef]);

  return (
    <div
      className={styles["dates-wrapper"]}
      style={maxHeight ? { maxHeight: `${maxHeight}px` } : {}}
    >
      {dates.map((date) => (
        <DateOfWork key={date.date} day={date} />
      ))}
    </div>
  );
}

export default DatesOfWork;