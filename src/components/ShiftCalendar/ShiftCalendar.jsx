import { useState } from "react";
import styles from "./ShiftCalendar.module.css";
import CardHeader from "@components/Employee/CardHeader/CardHeader";
import { calendar } from "@utils/icons";
import { DayPicker } from "react-day-picker";
import { ru } from "date-fns/locale";
import { format } from "date-fns";

function ShiftCalendar({ selectedDate, setSelectedDate, shiftData }) {
  const [month, setMonth] = useState(new Date());

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Модификаторы для тепловой карты (считаем людей из пропса shiftData)
  const modifiers = {
    low: (date) => shiftData[format(date, "yyyy-MM-dd")]?.length > 0 && shiftData[format(date, "yyyy-MM-dd")]?.length <= 2,
    medium: (date) => shiftData[format(date, "yyyy-MM-dd")]?.length >= 3 && shiftData[format(date, "yyyy-MM-dd")]?.length <= 4,
    high: (date) => shiftData[format(date, "yyyy-MM-dd")]?.length >= 5,
  };

  return (
    <div className={styles["card"]}>
      <CardHeader text="Выберите дату" logo={calendar} />
      <div className={styles["calendar-container"]}>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={month}
          onMonthChange={setMonth}
          fixedWeeks={true}
          showOutsideDays={true}
          locale={ru}
          modifiers={modifiers}
          modifiersClassNames={{
            low: styles["m-low"],
            medium: styles["m-medium"],
            high: styles["m-high"],
          }}
          classNames={{
            month: styles["month"],
            month_grid: styles["month_grid"],
            day: styles["day"],
            day_button: styles["day_button"],
            selected: styles["selected-day"],
            today: styles["today"],
            weekday: styles["weekday"],
          }}
          formatters={{
            formatCaption: (date) => capitalize(new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(date)),
            formatWeekdayName: (date) => capitalize(new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(date)),
          }}
          components={{
            MonthCaption: () => (
              <div className={styles["calendar-nav"]}>
                <button className={styles["nav-btn"]} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))}>‹</button>
                <p className={styles["nav-label"]}>
                  {capitalize(new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(month))}
                </p>
                <button className={styles["nav-btn"]} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))}>›</button>
              </div>
            ),
            Nav: () => null,
          }}
        />
      </div>
      <div className={styles["legend"]}>
         {/* ИСПРАВЛЕНИЕ: Добавлен класс legend-color для отображения цвета */}
         <div className={styles["legend-item"]}><span className={`${styles["legend-color"]} ${styles["c-low"]}`}></span> 1-2 чел.</div>
         <div className={styles["legend-item"]}><span className={`${styles["legend-color"]} ${styles["c-medium"]}`}></span> 3-4 чел.</div>
         <div className={styles["legend-item"]}><span className={`${styles["legend-color"]} ${styles["c-high"]}`}></span> 5+ чел.</div>
      </div>
    </div>
  );
}

export default ShiftCalendar;