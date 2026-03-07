import { person, company, settingsIcon, exitIcon } from "./icons";
import styles from "./ManagerPage.module.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import NavBar from "./NavBar/NavBar";

function ManagerPage({ props, logout }) {
  const [settings, setSettings] = useState(false);
  const settingsRef = useRef(null);
  const openSettingsRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      settingsRef.current &&
      !settingsRef.current.contains(e.target) &&
      !openSettingsRef.current.contains(e.target)
        ? setSettings(false)
        : null;
    });
  }, [settingsRef]);
  const exit = async () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className={styles["main"]}>
        <nav className={styles["menu"]}>
          <NavBar />
          <div className={styles["settings-wrapper"]}>
            <button
              ref={openSettingsRef}
              className={styles["settings"]}
              onClick={() => setSettings((x) => !x)}
            >
              <img src={settingsIcon} draggable={false} />
            </button>
            <div
              ref={settingsRef}
              className={
                settings
                  ? `${styles["settings-menu"]} ${styles["show"]}`
                  : styles["settings-menu"]
              }
            >
              <Link
                to="/editing_information"
                className={styles["link-wrapper"]}
              >
                <div className={styles["setting"]}>
                  <img src={person} draggable={false} />
                  <label className={styles["setting-button"]}>Настройки</label>
                </div>
              </Link>
              <li className={styles["border"]}></li>
              <div className={styles["setting"]} onClick={() => exit()}>
                <img src={exitIcon} draggable={false} />
                <button className={styles["setting-button"]}>Выйти</button>
              </div>
            </div>
          </div>
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
      </div>
    </>
  );
}

export default ManagerPage;
