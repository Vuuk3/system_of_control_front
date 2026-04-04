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
    if (search === "") checkEmployees();
    
    const timer = setTimeout(() => {
      if (search) checkEmployees();
    }, 300);

    const channel = new BroadcastChannel("employees");
    const handleMessage = (event) => {
      if (event.data.type === "employees-changed") checkEmployees();
    };
    channel.addEventListener("message", handleMessage);
    
    return () => {
      channel.close();
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    if (employeesData) {
      // Генерируем тестовые даты (на завтра и послезавтра), чтобы DatesOfWork не был пустым
      const today = new Date();
      const mockSchedule = [
        {
          date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString(),
          start_time: "08:00:00",
          end_time: "18:00:00",
        },
        {
          date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).toISOString(),
          start_time: "09:00:00",
          end_time: "17:00:00",
        },
      ];

      setEmployees(
        employeesData.map((e) => ({
          id: e.id,
          employeeData: {
            ...e,
            // Если с бека расписание не пришло, подставляем моковое
            schedule: e.schedule && e.schedule.length > 0 ? e.schedule : mockSchedule,
          },
          cells: [
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
          ],
        }))
      );
    }
  }, [employeesData]);

  function copyQuestionaryLink() {
    navigator.clipboard.writeText("example");
  }

  if (!employees) return <></>;

  return (
    <>
      <Title text="Персонал" />
      <div className={styles["main"]}>
        <Menu header_text="Персонал" header_logo={person} />
        
        <div className={styles["content"]}>
          <div className={styles["card"]}>
            <div className={styles["tools"]}>
              <div className={styles["search-bar"]}>
                <NoDraggableImg className={styles["search-icon"]} src={searchIcon} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={styles["search-input"]}
                  placeholder="Поиск сотрудника..."
                />
              </div>

              <div className={styles["actions"]}>
                <button
                  className={styles["btn-icon"]}
                  onClick={() => copyQuestionaryLink()}
                  title="Скопировать ссылку на анкету"
                >
                  <NoDraggableImg className={styles["icon"]} src={share} />
                </button>
                <NoDraggableLink className={styles["btn-primary"]} to="/add_employee" target="_blank">
                  <NoDraggableImg className={styles["icon-white"]} src={plus} />
                  <span>Добавить сотрудника</span>
                </NoDraggableLink>
              </div>
            </div>

            <Table
              headers={[
                "ФИО",
                "Контактные данные",
                "Должность",
                "Зарплата",
                "Приход / Уход",
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