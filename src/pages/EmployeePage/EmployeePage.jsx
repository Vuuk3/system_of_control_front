import { VALUTA } from "@utils/valuta";
import styles from "./EmployeePage.module.css";
import TimeEntries from "@components/TimeEntries/TimeEntries";
import { calendar, clock, settingsIcon2 } from "@utils/icons";
import Schedule from "@components/Schedule/Schedule";
import Settings from "@components/Settings/Settings";

function EmployeePage({ props }) {
  const attendance = [
    { date: "2026-03-01", entry_time: "08:00", exit_time: "18:00" },
    { date: "2026-03-02", entry_time: "08:15", exit_time: "18:15" },
    { date: "2026-03-03", entry_time: "08:05", exit_time: "18:05" },
    { date: "2026-03-04", entry_time: "08:10", exit_time: "18:10" },
    { date: "2026-03-05", entry_time: "08:30", exit_time: "18:30" },
    { date: "2026-03-06", entry_time: "08:20", exit_time: "18:20" },
    { date: "2026-03-07", entry_time: "08:25", exit_time: "18:25" },
    { date: "2026-03-08", entry_time: "08:01", exit_time: "18:01" },
    { date: "2026-03-09", entry_time: "08:10", exit_time: "18:10" },
    { date: "2026-03-10", entry_time: "08:30", exit_time: "18:30" },
    { date: "2026-03-11", entry_time: "08:15", exit_time: "18:15" },
    { date: "2026-03-12", entry_time: "08:05", exit_time: "18:05" },
    { date: "2026-03-13", entry_time: "08:20", exit_time: "18:20" },
    { date: "2026-03-14", entry_time: "08:25", exit_time: "18:25" },
    { date: "2026-03-15", entry_time: "08:00", exit_time: "18:00" },
  ];

  return (
    <div className={styles["main"]}>
      <div className={styles["header"]}>
        <h1>Личный кабинет</h1>
        <Settings
          setting_path={"/"}
          className={styles["settings"]}
          color={styles["color"]}
          settingsIcon={settingsIcon2}
        />
      </div>
      <div className={styles["cards"]}>
        <div className={`${styles["card"]} ${styles["profile"]}`}>
          <img
            src={props.profile.avatar_url}
            className={styles["profile-logo"]}
          />
          <h3 className={styles["profile-name"]}>{props.profile.full_name}</h3>
          <p className={styles["profile-position"]}>{props.profile.position}</p>
          <p className={styles["profile-contacts-email"]}>{props.email}</p>
          <p className={styles["profile-contacts-phone"]}>
            {props.profile.phone}
          </p>
          <h5 className={styles["profile-salary-header"]}>Моя ЗП</h5>
          <p className={styles["profile-salary"]}>
            103000{" " + VALUTA[props.profile.currency]}
          </p>
          <p className={styles["rate-amount"]}>
            Ставка: 2500{" " + VALUTA[props.profile.currency]}
          </p>
          <p className={styles["rate-type"]}>Смена: 20 смен</p>
        </div>
        <div className={`${styles["card"]} ${styles["adjustments"]}`}>
          <div className={styles["fines"]}>
            <h3 className={styles["card-header"]}>Мои штрафы</h3>
            <p className={styles["fine-amount"]}>
              Итого: -2500{" " + VALUTA[props.profile.currency]}
            </p>
          </div>
          <div className={styles["bonuses"]}>
            <h3 className={styles["card-header"]}>Мои премии</h3>
            <p className={styles["bonus-amount"]}>
              Итого: 5000{" " + VALUTA[props.profile.currency]}
            </p>
          </div>
        </div>
        <Schedule
          text="Расписание"
          cardLogo={calendar}
          days={props.profile.schedule}
          className={styles["schedule"]}
        />
        <TimeEntries
          text="Время входа/ухода"
          cardLogo={clock}
          values={attendance}
          className={styles["attendance"]}
        />
      </div>
    </div>
  );
}

export default EmployeePage;
