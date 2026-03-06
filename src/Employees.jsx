import employee1 from "./assets/employee.jpg";
import employee2 from "./assets/employee2.jpg";
import employee3 from "./assets/employee3.jpg";
import employee4 from "./assets/employee4.jpg";
import employee5 from "./assets/employee5.jpg";
import employee6 from "./assets/employee6.jpg";
import employee7 from "./assets/employee7.jpg";
import person from "./assets/fio.svg";
import plus from "./assets/plus.svg";
import search from "./assets/search.svg";
import schedule from "./assets/schedule.svg";
import dossier from "./assets/dossier.svg";
import download from "./assets/download.svg";
import styles from "./Employees.module.css";
import { useEffect, useState } from "react";
import NavBar from "./NavBar/NavBar";

function Employee({
  photo,
  name,
  phone_number,
  email,
  position,
  rate_amount,
  currency,
  entry_time,
  exit_time,
}) {
  function substractTime(time1, time2) {
    const [hours1, minutes1] = time1.split(":").map(Number);
    const [hours2, minutes2] = time2.split(":").map(Number);
    return hours1 * 60 + minutes1 - (hours2 * 60 + minutes2) < 15;
  }

  return (
    <>
      <tr className={styles["employee"]}>
        <td className={styles["content"]}>
          <div className={styles["profile"]}>
            <img
              className={styles["profile-logo"]}
              src={photo}
              draggable={false}
            />
            <p className={styles["profile-name"]}>{name}</p>
          </div>
        </td>
        <td className={styles["content"]}>
          <div className={styles["contacts"]}>
            <p className={styles["contacts-phone"]}>{phone_number}</p>
            <p className={styles["contacts-email"]}>{email}</p>
          </div>
        </td>
        <td className={styles["content"]}>
          <p className={styles["position-p"]}>{position}</p>
        </td>
        <td className={styles["content"]}>
          <p className={styles["rate-p"]}>
            {rate_amount}{" "}
            {currency == "RUB" ? "₽" : currency == "EUR" ? "€" : "$"}
          </p>
        </td>
        <td className={styles["content"]}>
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
        </td>
        <td className={styles["content"]}>
          <button className={styles["schedule-button"]}>
            <img className={styles["schedule-logo"]} src={schedule} />
          </button>
        </td>
        <td className={styles["content"]}>
          <button className={styles["dossier-button"]}>
            <img className={styles["dossier-logo"]} src={dossier} />
          </button>
        </td>
      </tr>
    </>
  );
}

function ListEmployee({ employees }) {
  const test_employees = [...employees];
  const logos = [
    employee1,
    employee2,
    employee3,
    employee4,
    employee5,
    employee6,
    employee7,
  ];
  return (
    <>
      {test_employees.map((employee) => (
        <Employee
          key={employee.id}
          photo={logos[Math.floor(Math.random() * logos.length)]}
          email={employee.email}
          name={employee.profile.full_name}
          phone_number={employee.profile.phone}
          position={employee.profile.position}
          rate_amount={employee.profile.rate_amount}
          currency={employee.profile.currency}
          entry_time="08:01"
          exit_time="18:01"
        />
      ))}
    </>
  );
}

function Employees() {
  const URL = "http://localhost:8001/api/employees";
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetch(URL, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((answer) =>
        answer.detail == "Not authenticated"
          ? (window.location.pathname = "/login")
          : setEmployees(answer),
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function copyQuestionaryLink() {
    const link = "example";
    navigator.clipboard.writeText(link);
  }

  return (
    <>
      <div className={styles["main"]}>
        <div className={styles["main_panel"]}>
          <div className={styles["logo"]}>
            <img className={styles["logo-img"]} src={person} />
            <h1 className={styles["logo-header"]}>Персонал</h1>
          </div>
          <nav>
            <NavBar />
          </nav>
          <div className={styles["buttons"]}>
            <div className={styles["add_employee"]}>
              <img className={styles["add_employee-logo"]} src={plus} />
              <a className={styles["add_employee-link"]} href="/add_employee">
                Добавить сотрудника
              </a>
            </div>
            <div className={styles["download"]}>
              <button className={styles["download-button"]}>
                <img
                  className={styles["download-logo"]}
                  src={download}
                  onClick={() => copyQuestionaryLink()}
                />
              </button>
            </div>
          </div>
        </div>
        <div className={styles["card"]}>
          <div className={styles["employees"]}>
            <div className={styles["search_bar"]}>
              <img className={styles["search_bar-logo"]} src={search} />
              <input
                type="text"
                className={styles["search_bar-input"]}
                placeholder="Поиск сотрудника..."
              />
            </div>
            <div className={styles["table-wrapper"]}>
              <table className={styles["table"]}>
                <thead>
                  <tr>
                    <th className={styles["table-header"]}>ФИО</th>
                    <th className={styles["table-header"]}>
                      Контактные данные
                    </th>
                    <th className={styles["table-header"]}>Должность</th>
                    <th className={styles["table-header"]}>Зарплата</th>
                    <th className={styles["table-header"]}>
                      Время прихода и ухода
                    </th>
                    <th className={styles["table-header"]}>Расписание</th>
                    <th className={styles["table-header"]}>Досье</th>
                  </tr>
                </thead>
                <tbody>
                  <ListEmployee employees={employees} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Employees;
