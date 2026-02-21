import company from "./assets/company.jpg";
import settings from "./assets/settings.svg";
import person from "./assets/fio.svg";
import exit from "./assets/exit.svg";
import styles from "./ManagerPage.module.css";
import { useEffect, useRef, useState } from "react";

function ManagerPage() {
  const [settingsIsOpen, SetSettingsIsOpen] = useState(false);
  const settingsRef = useRef(null);
  const openSettingsRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      settingsRef &&
      !settingsRef.current.contains(e.target) &&
      !openSettingsRef.current.contains(e.target)
        ? SetSettingsIsOpen(false)
        : {};
    });
  }, []);
  return (
    <>
      <div className={styles["main"]}>
        <nav className={styles["menu"]}>
          <ul className={styles["navigation"]}>
            <a className={styles["link"]}>Персонал</a>
            <a className={styles["link"]}>Зарплаты</a>
            <a className={styles["link"]}>Расписание смен</a>
            <a className={styles["link"]}>Заявки</a>
            <a className={styles["link"]}>Показать QR-код</a>
          </ul>
          <button
            ref={openSettingsRef}
            className={styles["settings"]}
            onClick={() => SetSettingsIsOpen((x) => !x)}
          >
            <img src={settings} draggable={false} />
          </button>
        </nav>
        <div className={styles["company"]}>
          <img
            className={styles["company_img"]}
            src={company}
            draggable={false}
          />
          <div className={styles["company_info"]}>
            <h2 className={styles["company_info-name"]}>
              ООО «Название компании»
            </h2>
            <p className={styles["company_info-inn"]}>ИНН: 1111111111</p>
            <h5 className={styles["company_info-legal_adress"]}>
              Юридический адрес:
            </h5>
            <p className={styles["company_info-address"]}>
              г. Москва, ул. Примерная, дом 1, офис 2
            </p>
          </div>
        </div>
        <div
          ref={settingsRef}
          className={
            settingsIsOpen
              ? `${styles["settings-menu"]} ${styles["show"]}`
              : styles["settings-menu"]
          }
        >
          <div className={styles["setting"]}>
            <img src={person} draggable={false} />
            <button className={styles["setting-button"]}>Настройки</button>
          </div>
          <li className={styles["border"]}></li>
          <div className={styles["setting"]}>
            <img src={exit} draggable={false} />
            <button className={styles["setting-button"]}>Выйти</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerPage;
