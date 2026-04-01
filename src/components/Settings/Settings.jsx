import styles from "./Settings.module.css";
import { exitIcon, person } from "@utils/icons";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@contexts/UserContext";
import { useNavigate } from "react-router";
import NoDraggableImg from "../NoDraggableImg/NoDraggableImg";
import NoDraggableLink from "../NoDraggableLink/NoDraggableLink";

function Settings({
  className = "",
  color = "",
  settingsIcon,
  setting_path,
  mode = "employee",
  additional_link,
}) {
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
    <div className={styles["settings-wrapper"]}>
      <button
        ref={openSettingsRef}
        className={`${styles["settings"]} ${className}`}
        onClick={() => setSettings((x) => !x)}
      >
        <NoDraggableImg src={settingsIcon} />
      </button>
      <div
        ref={settingsRef}
        className={`${styles["settings-menu"]} ${color} ${settings ? styles["show"] : ""}`}
      >
        {mode == "manager" ? (
          additional_link.map((l) =>
            !visibleLinks ? (
              <NoDraggableLink
                key={l.text}
                to={l.link}
                className={`${styles["link-wrapper"]} ${l.link == location.pathname ? styles["checked"] : ""}`}
              >
                <div
                  className={`${styles["setting"]} ${l.link == location.pathname ? styles["checked"] : ""}`}
                >
                  <label className={styles["setting-button"]}>{l.text}</label>
                </div>
              </NoDraggableLink>
            ) : null,
          )
        ) : (
          <></>
        )}

        <NoDraggableLink to={setting_path} className={styles["link-wrapper"]}>
          <div className={styles["setting"]}>
            <NoDraggableImg src={person} />
            <label className={`${styles["setting-button"]} ${color}`}>
              Настройки
            </label>
          </div>
        </NoDraggableLink>
        <li className={`${styles["border"]} ${className}`}></li>
        <div className={styles["setting"]} onClick={() => exit()}>
          <NoDraggableImg src={exitIcon} />
          <button className={`${styles["setting-button"]} ${color}`}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
