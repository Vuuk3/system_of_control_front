import styles from "./Calendar.module.css";
import { DayPicker } from "react-day-picker";
import { ru } from "date-fns/locale";
import { useState } from "react";

function Calendar({ days, setDays, setEdit = null, rate_amount, rate_type }) {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function updateRateList(rateList, dateList, rate_amount, rate_type) {
    const dateSet = new Set(dateList);

    const filtered = rateList.filter((entry) => dateSet.has(entry.date));

    const result = [...filtered];

    for (const date of dateList) {
      if (!filtered.find((e) => e.date === date)) {
        result.push({
          date,
          rate_type,
          rate_amount,
        });
      }
    }

    return result;
  }

  function handleClick(newDays) {
    if (!days) return;
    const updatedDays = updateRateList(days, newDays, rate_amount, rate_type);
    setDays(
      updatedDays.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ),
    );
    if (setEdit) setEdit(true);
  }

  const [month, setMonth] = useState(new Date());
  const [isCurrentMonth, setIsCurrentMonth] = useState(true);
  const prevMonth = new Date(month.getFullYear(), month.getMonth() - 1);
  const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1);
  const today = new Date().setHours(0, 0, 0, 0);

  return (
    <>
      <DayPicker
        fixedWeeks={true}
        mode="multiple"
        showOutsideDays={true}
        selected={days.map((day) => new Date(day.date))}
        onSelect={handleClick}
        disabled={{ before: today }}
        month={month}
        onMonthChange={setMonth}
        locale={ru}
        classNames={{
          day: styles["day"],
          day_button: styles["day_button"],
          selected: styles["selected"],
          disabled: styles["disabled"],
          month_grid: styles["month_grid"],
          month: styles["month"],
          weekday: styles["weekday"],
        }}
        formatters={{
          formatCaption: (date) =>
            capitalize(
              new Intl.DateTimeFormat("ru-RU", {
                month: "long",
                year: "numeric",
              }).format(date),
            ),
          formatWeekdayName: (date) =>
            capitalize(
              new Intl.DateTimeFormat("ru-RU", {
                weekday: "short",
              }).format(date),
            ),
        }}
        components={{
          MonthCaption: () => (
            <div className={styles["calendar-nav"]}>
              <button
                className={styles["calendar-nav-button"]}
                onClick={() => {
                  setMonth(prevMonth);
                  setIsCurrentMonth(true);
                }}
                style={{ visibility: isCurrentMonth ? "hidden" : "visible" }}
              >
                ‹
              </button>
              <p className={styles["calendar-nav-p"]}>
                {capitalize(
                  new Intl.DateTimeFormat("ru-RU", {
                    month: "long",
                    year: "numeric",
                  }).format(month),
                )}
              </p>
              <button
                className={styles["calendar-nav-button"]}
                onClick={() => {
                  setMonth(nextMonth);
                  setIsCurrentMonth(false);
                }}
                style={{ visibility: isCurrentMonth ? "visible" : "hidden" }}
              >
                ›
              </button>
            </div>
          ),
          Nav: () => null,
        }}
      />
    </>
  );
}

export default Calendar;
