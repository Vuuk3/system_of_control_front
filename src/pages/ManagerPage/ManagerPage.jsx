import { company, building, salary, person, dossier, clock } from "@utils/icons";
import styles from "./ManagerPage.module.css";
import Menu from "@components/Menu/Menu";
import NoDraggableImg from "@components/NoDraggableImg/NoDraggableImg";
import Title from "@components/Title/Title";
import CardHeader from "@components/Employee/CardHeader/CardHeader";

function ManagerPage({ props }) {
  // Моковые данные для дашборда (позже можно получать из API)
  const dashboardStats = {
    expenses: "1 250 000 ₽",
    bonuses: "45 000 ₽",
    fines: "12 500 ₽",
    employeesCount: "24",
  };

  return (
    <>
      <Title text="Главная страница" />
      <div className={styles["main"]}>
        <Menu header_text="Главная" header_logo={building} />
        
        <div className={styles["content"]}>
          {/* ── Карточка компании ── */}
          <div className={styles["company-card"]}>
            <NoDraggableImg className={styles["company-img"]} src={company} />
            <div className={styles["company-info"]}>
              <h2 className={styles["company-name"]}>
                {props.company.legal_form.toUpperCase()} «{props.company.name}»
              </h2>
              <div className={styles["company-details"]}>
                <div className={styles["detail-group"]}>
                  <h5 className={styles["detail-label"]}>ИНН</h5>
                  <p className={styles["detail-value"]}>{props.company.inn}</p>
                </div>
                <div className={styles["detail-group"]}>
                  <h5 className={styles["detail-label"]}>БИК</h5>
                  <p className={styles["detail-value"]}>{props.company.bik}</p>
                </div>
                <div className={styles["detail-group"]} style={{ gridColumn: "1 / -1" }}>
                  <h5 className={styles["detail-label"]}>Юридический адрес</h5>
                  <p className={styles["detail-value"]}>{props.company.legal_address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Сводка за месяц (Дашборд) ── */}
          <div className={styles["dashboard-section"]}>
            <h3 className={styles["section-title"]}>Сводка за текущий месяц</h3>
            <div className={styles["stats-grid"]}>
              
              <div className={styles["stat-card"]}>
                <CardHeader text="Расход на зарплаты" logo={salary} />
                <div className={styles["stat-content"]}>
                  <p className={`${styles["stat-value"]} ${styles["text-primary"]}`}>
                    {dashboardStats.expenses}
                  </p>
                </div>
              </div>

              <div className={styles["stat-card"]}>
                <CardHeader text="Выплачено премий" logo={dossier} />
                <div className={styles["stat-content"]}>
                  <p className={`${styles["stat-value"]} ${styles["text-success"]}`}>
                    {dashboardStats.bonuses}
                  </p>
                </div>
              </div>

              <div className={styles["stat-card"]}>
                <CardHeader text="Удержано штрафов" logo={clock} />
                <div className={styles["stat-content"]}>
                  <p className={`${styles["stat-value"]} ${styles["text-error"]}`}>
                    {dashboardStats.fines}
                  </p>
                </div>
              </div>

              <div className={styles["stat-card"]}>
                <CardHeader text="Штат сотрудников" logo={person} />
                <div className={styles["stat-content"]}>
                  <p className={styles["stat-value"]}>
                    {dashboardStats.employeesCount} чел.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ManagerPage;