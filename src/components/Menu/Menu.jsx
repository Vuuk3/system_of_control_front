import styles from "./Menu.module.css";
import { settingsIcon, exitIcon, person } from "@utils/icons";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@contexts/UserContext";
import { useNavigate } from "react-router";
import NavBar from "@components/NavBar/NavBar";
import NoDraggableImg from "../NoDraggableImg/NoDraggableImg";
import NoDraggableLink from "../NoDraggableLink/NoDraggableLink";

function Menu({ header_text, header_logo }) {
  const [settings, setSettings] = useState(false);
  const settingsRef = useRef(null);
  const openSettingsRef = useRef(null);
  const { logout } = useUser();
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
      <nav className={styles["menu"]}>
        <div className={styles["logo"]}>
          <NoDraggableImg className={styles["logo-img"]} src={header_logo} />
          <h1 className={styles["logo-header"]}>{header_text}</h1>
        </div>

        <NavBar />
        <div className={styles["settings-wrapper"]}>
          <button
            ref={openSettingsRef}
            className={styles["settings"]}
            onClick={() => setSettings((x) => !x)}
          >
            <NoDraggableImg src={settingsIcon} />
          </button>
          <div
            ref={settingsRef}
            className={
              settings
                ? `${styles["settings-menu"]} ${styles["show"]}`
                : styles["settings-menu"]
            }
          >
            <NoDraggableLink
              to="/editing_information"
              className={styles["link-wrapper"]}
            >
              <div className={styles["setting"]}>
                <NoDraggableImg src={person} />
                <label className={styles["setting-button"]}>Настройки</label>
              </div>
            </NoDraggableLink>
            <li className={styles["border"]}></li>
            <div className={styles["setting"]} onClick={() => exit()}>
              <NoDraggableImg src={exitIcon} />
              <button className={styles["setting-button"]}>Выйти</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Menu;
