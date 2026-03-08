import styles from "./Menu.module.css";
import { settingsIcon, exitIcon, person } from "@utils/icons";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import NavBar from "@components/NavBar/NavBar";

function Menu({ header_text, header_logo, exit }) {
  const [settings, setSettings] = useState(false);
  const settingsRef = useRef(null);
  const openSettingsRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      settingsRef.current &&
      !settingsRef.current.contains(e.target) &&
      !openSettingsRef.current.contains(e.target)
        ? setSettings(false)
        : null;
    });
  }, [settingsRef]);
  return (
    <>
      <nav className={styles["menu"]}>
        <div className={styles["logo"]}>
          <img className={styles["logo-img"]} src={header_logo} />
          <h1 className={styles["logo-header"]}>{header_text}</h1>
        </div>

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
            <Link to="/editing_information" className={styles["link-wrapper"]}>
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
    </>
  );
}

export default Menu;
