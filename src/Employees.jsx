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
import styles_manager from "./ManagerPage.module.css";

function Employee({
  photo,
  first_name,
  last_name,
  patronymic,
  phone_number,
  email,
  position,
  rate_amount,
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
            <img className={styles["profile-logo"]} src={photo} />
            <p className={styles["profile-name"]}>
              {first_name} {last_name} {patronymic && patronymic}
            </p>
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
          <p className={styles["rate-p"]}>{rate_amount}</p>
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

function ListEmployee() {
  const employees = [
    {
      user_id: 1,
      photo: employee2,
      first_name: "Dd",
      last_name: "Dd",
      patronymic: "Dd",
      phone_number: "+79873210012",
      email: "test@example.ru",
      position: "test",
      rate_amount: 30000,
      entry_time: "09:00",
      exit_time: "18:01",
    },
    {
      user_id: 2,
      photo: employee1,
      first_name: "Шиханова",
      last_name: "Дарья",
      patronymic: null,
      phone_number: "+79873210012",
      email: "test@example.ru",
      position: "test2",
      rate_amount: 30000,
      entry_time: "08:14",
      exit_time: "18:01",
    },
    {
      user_id: 3,
      photo: employee3,
      first_name: "Шиханова",
      last_name: "Дарья",
      patronymic: "Сергеевна",
      phone_number: "+79873210012",
      email: "test@example.ru",
      position: "test2",
      rate_amount: 30000,
      entry_time: "08:14",
      exit_time: "18:16",
    },
    {
      user_id: 4,
      photo: employee4,
      first_name: "Dd",
      last_name: "Dd",
      patronymic: "Dd",
      phone_number: "+79873210012",
      email: "test@example.ru",
      position: "test",
      rate_amount: 30000,
      entry_time: "09:00",
      exit_time: "18:01",
    },
    {
      user_id: 5,
      photo: employee5,
      first_name: "Dd",
      last_name: "Dd",
      patronymic: "Dd",
      phone_number: "+79873210012",
      email: "test@example.ru",
      position: "test",
      rate_amount: 30000,
      entry_time: "09:00",
      exit_time: "18:01",
    },
    {
      user_id: 6,
      photo: employee6,
      first_name: "Dd",
      last_name: "Dd",
      patronymic: "Dd",
      phone_number: "+79873210012",
      email: "test@example.ru",
      position: "test",
      rate_amount: 30000,
      entry_time: "09:00",
      exit_time: "18:01",
    },
    {
      user_id: 7,
      photo: employee7,
      first_name: "Dd",
      last_name: "Dd",
      patronymic: "Dd",
      phone_number: "+79873210012",
      email: "test@example.ru",
      position: "test",
      rate_amount: 30000,
      entry_time: "09:00",
      exit_time: "18:01",
    },
  ];
  return (
    <>
      {employees.map((employee) => (
        <Employee key={employee.user_id} {...employee} />
      ))}
    </>
  );
}

function Employees() {
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
            <ul className={styles_manager["navigation"]}>
              <a href="personal_account" className={styles_manager["link"]}>
                Главная страница
              </a>
              <a className={styles_manager["link"]}>Зарплаты</a>
              <a className={styles_manager["link"]}>Расписание смен</a>
              <a className={styles_manager["link"]}>Заявки</a>
              <a className={styles_manager["link"]}>Показать QR-код</a>
            </ul>
          </nav>
          <div className={styles["buttons"]}>
            <div className={styles["add_employee"]}>
              <img className={styles["add_employee-logo"]} src={plus} />
              <button className={styles["add_employee-button"]}>
                Добавить сотрудника
              </button>
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
                  <ListEmployee />
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
