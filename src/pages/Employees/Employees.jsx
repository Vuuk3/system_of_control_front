import {
  person,
  plus,
  searchIcon,
  scheduleIcon,
  dossier,
  share,
} from "@utils/icons";
import styles from "./Employees.module.css";
import { useEffect, useState } from "react";
import { useEmployees } from "@contexts/EmployeesContext";
import { useNavigate } from "react-router";
import Menu from "@components/Menu/Menu";
import Table from "@components/Table/Table";
import { VALUTA } from "@utils/valuta";
import NoDraggableImg from "@components/NoDraggableImg/NoDraggableImg";
import NoDraggableLink from "@components/NoDraggableLink/NoDraggableLink";
import Title from "@components/Title/Title";

function Employees() {
  const { employeesData, getEmployees } = useEmployees();
  const [employees, setEmployees] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const checkEmployees = async () => {
      try {
        await getEmployees(search);
      } catch (err) {
        navigate("/personal_account");
      }
    };
    if (search == "") {
      checkEmployees();
    }
    const timer = setTimeout(() => {
      if (search) {
        checkEmployees();
      }
    }, 300);
    const channel = new BroadcastChannel("employees");
    const handleMessage = (event) => {
      if (event.data.type == "employees-changed") {
        checkEmployees();
      }
    };
    channel.addEventListener("message", handleMessage);
    return () => {
      channel.close();
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    if (employeesData) {
      setEmployees(
        employeesData.map((e) => [
          {
            type: "text",
            text: e.id,
          },
          {
            type: "profile",
            id: e.id,
            photo: e.profile.avatar_url,
            name: e.profile.full_name,
          },
          { type: "contacts", phone: e.profile.phone, email: e.email },
          { type: "text", text: e.profile.position },
          {
            type: "text",
            text: `${e.final_salary} ${VALUTA[e.profile.currency]}`,
          },
          { type: "time", entry_time: "08:01", exit_time: "18:01" },
          { type: "button", id: e.id, mode: "schedule", icon: scheduleIcon },
          { type: "button", id: e.id, mode: "dossier", icon: dossier },
        ]),
      );
    }
  }, [employeesData]);

  function copyQuestionaryLink() {
    const link = "example";
    navigator.clipboard.writeText(link);
  }
  if (!employees) return <></>;
  return (
    <>
      <Title text="Персонал" />
      <div className={styles["main"]}>
        <Menu header_text="Персонал" header_logo={person} />
        <div className={styles["card"]}>
          <div className={styles["employees"]}>
            <div className={styles["employees-tools"]}>
              <div className={styles["search_bar"]}>
                <NoDraggableImg
                  className={styles["search_bar-logo"]}
                  src={searchIcon}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className={styles["search_bar-input"]}
                  placeholder="Поиск сотрудника..."
                />
              </div>
              <div className={styles["buttons"]}>
                <div className={styles["add_employee"]}>
                  <NoDraggableImg
                    className={styles["add_employee-logo"]}
                    src={plus}
                  />
                  <NoDraggableLink
                    className={styles["add_employee-link"]}
                    to="/add_employee"
                    target="_blank"
                    rel="noopener norefferrer"
                  >
                    Добавить сотрудника
                  </NoDraggableLink>
                </div>
                <div className={styles["download"]}>
                  <button
                    className={styles["download-button"]}
                    title="Скопировать ссылку на анкету"
                  >
                    <NoDraggableImg
                      className={styles["download-logo"]}
                      src={share}
                      onClick={() => copyQuestionaryLink()}
                    />
                  </button>
                </div>
              </div>
            </div>
            <Table
              headers={[
                "ID",
                "ФИО",
                "Контактные данные",
                "Должность",
                "Зарплата",
                "Время прихода и ухода",
                "Расписание",
                "Досье",
              ]}
              content={employees}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Employees;
