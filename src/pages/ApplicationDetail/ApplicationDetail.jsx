import styles from "./ApplicationDetail.module.css";
import { useParams, useNavigate } from "react-router";
import { person, calendar } from "@utils/icons";
import { VALUTA } from "@utils/valuta";
import CardHeader from "@components/Employee/CardHeader/CardHeader";
import Schedule from "@components/Employee/Schedule/Schedule";
import { MOCK_APPLICATIONS, generateScheduleFromWeekdays } from "@utils/mockApplications";
import { useState, useEffect } from "react";

function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const app = MOCK_APPLICATIONS.find(a => a.id === parseInt(id));
    if (app) {
      setData(app);
      setDays(generateScheduleFromWeekdays(app.preferred_weekdays));
    }
  }, [id]);

  const handleAccept = () => {
    alert("Кандидат принят!");
    window.close(); // Так как открыто в новой вкладке, просто закрываем
  };

  const handleReject = () => {
    alert("Кандидат отклонен.");
    window.close();
  };

  if (!data) return <></>;

  return (
    <div className={styles["main"]}>
      {/* ── Топбар как в Employee.jsx (Без навигации) ── */}
      <div className={styles["topbar"]}>
        <span className={styles["topbar-title"]}>Staff Tracker</span>
        <span className={styles["topbar-label"]}>Анкета кандидата</span>
      </div>

      <div className={styles["cards-wrapper"]}>
        <div className={styles["cards"]}>
          
          {/* ── Строка 1: Профиль (Слева) и Кнопки (Справа, внизу) ── */}
          <div className={styles["col1"]}>
            <div className={styles["card"]}>
              <CardHeader text="Информация о кандидате" logo={person} />
              <div className={styles["profile-content"]}>
                <div className={styles["field-group"]}>
                  <span className={styles["label"]}>ФИО</span>
                  <div className={styles["value-box"]}>{data.full_name}</div>
                </div>

                <div className={styles["field-row"]}>
                  <div className={styles["field-group"]}>
                    <span className={styles["label"]}>Телефон</span>
                    <div className={styles["value-box"]}>{data.phone}</div>
                  </div>
                  <div className={styles["field-group"]}>
                    <span className={styles["label"]}>Email</span>
                    <div className={styles["value-box"]}>{data.email}</div>
                  </div>
                </div>

                <div className={styles["field-row"]}>
                  <div className={styles["field-group"]}>
                    <span className={styles["label"]}>Желаемая должность</span>
                    <div className={styles["value-box"]}>{data.expected_position}</div>
                  </div>
                  <div className={styles["field-group"]}>
                    <span className={styles["label"]}>Ожидаемая ЗП</span>
                    <div className={styles["value-box"]}>{data.expected_salary} {VALUTA[data.currency]}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ваш компонент Schedule УЖЕ разделен внутри на календарь и даты */}
            {/* Мы помещаем его под профилем */}
            <Schedule
              text="Предпочтительный график"
              cardLogo={calendar}
              days={days}
              setDays={() => {}} 
              rate_type="hourly"
              rate_amount={0}
            />
          </div>

          {/* ── Правая колонка: Пустое пространство сверху, кнопки снизу ── */}
          <div className={styles["col2"]}>
            {/* Здесь можно разместить сопроводительное письмо или навыки, если они появятся */}
            <div className={styles["spacer"]}></div>
            
            {/* Кнопки в стиле Buttons.jsx (без белого фона карточки) */}
            <div className={styles["buttons"]}>
              <button className={styles["btn-reject"]} onClick={handleReject}>Отклонить</button>
              <button className={styles["btn-accept"]} onClick={handleAccept}>Принять кандидата</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ApplicationDetail;