import company from "./assets/company.jpg";
import settings from "./assets/settings.svg";
import person from "./assets/fio.svg";
import exitLogo from "./assets/exit.svg";
import styles from "./ManagerPage.module.css";
import { useEffect, useRef, useState } from "react";

function ManagerPage({ props }) {
  const [settingsIsOpen, SetSettingsIsOpen] = useState(false);
  const settingsRef = useRef(null);
  const openSettingsRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      settingsRef &&
      !settingsRef.current.contains(e.target) &&
      !openSettingsRef.current.contains(e.target)
        ? SetSettingsIsOpen(false)
        : null;
    });
  }, []);

  function exit() {
    const URL = "http://localhost:8001/api/auth/logout";
    fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((answer) =>
        answer.detail == "Logged out" ? (window.location.pathname = "/") : null,
      );
  }
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
              {props.company.legal_form.toUpperCase()} «{props.company.name}»
            </h2>
            <h5 className={styles["company_info-legal_adress"]}>
              Юридический адрес:
            </h5>
            <p className={styles["company_info-address"]}>
              {props.company.legal_address}
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
            <a href="/editing_information" className={styles["setting-button"]}>
              Настройки
            </a>
          </div>
          <li className={styles["border"]}></li>
          <div className={styles["setting"]}>
            <img src={exitLogo} draggable={false} />
            <button className={styles["setting-button"]} onClick={() => exit()}>
              Выйти
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerPage;
