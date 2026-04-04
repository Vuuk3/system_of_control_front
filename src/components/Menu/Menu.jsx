import styles from "./Menu.module.css";
import { settingsIcon, exitIcon, person } from "@utils/icons";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@contexts/UserContext";
import { useNavigate, useLocation } from "react-router";
import NavBar from "@components/NavBar/NavBar";
import NoDraggableImg from "../NoDraggableImg/NoDraggableImg";
import NoDraggableLink from "../NoDraggableLink/NoDraggableLink";
import { LINKS_LIST } from "@utils/navLinks";

function Menu({ header_text, header_logo }) {
  const [settings, setSettings] = useState(false);
  const [visibleLinks, setVisibleLinks] = useState(true);
  
  const settingsRef = useRef(null);
  const openSettingsRef = useRef(null);
  
  const { logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target) &&
        !openSettingsRef.current.contains(e.target)
      ) {
        setSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [settingsRef]);

  const exit = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className={styles["menu"]}>
      <div className={styles["logo"]}>
        <NoDraggableImg className={styles["logo-img"]} src={header_logo} />
        <h1 className={styles["logo-header"]}>{header_text}</h1>
      </div>

      <NavBar visibleLinks={visibleLinks} setVisibleLinks={setVisibleLinks} />
      
      <div className={styles["settings-wrapper"]}>
        <button
          ref={openSettingsRef}
          className={`${styles["settings-btn"]} ${settings ? styles["active"] : ""}`}
          onClick={() => setSettings((x) => !x)}
        >
          <NoDraggableImg src={settingsIcon} className={styles["settings-icon"]} />
        </button>
        
        <div
          ref={settingsRef}
          className={`${styles["settings-menu"]} ${settings ? styles["show"] : ""}`}
        >
          {/* Ссылки из навбара (если они скрыты из-за нехватки места) */}
          {!visibleLinks &&
            LINKS_LIST.map((l) => {
              const isActive = l.link === location.pathname;
              const isDisabled = !l.link;

              return (
                <NoDraggableLink
                  key={l.text}
                  to={l.link || "#"}
                  className={styles["link-wrapper"]}
                  onClick={() => !isDisabled && setSettings(false)}
                >
                  <div
                    className={`${styles["setting"]} ${isActive ? styles["checked"] : ""} ${isDisabled ? styles["disabled"] : ""}`}
                  >
                    <span className={styles["setting-text"]}>{l.text}</span>
                  </div>
                </NoDraggableLink>
              );
            })}

          {/* Отделяем ссылки навбара (если они есть) от настроек */}
          {!visibleLinks && <div className={styles["border"]}></div>}

          <NoDraggableLink
            to="/editing_information"
            className={styles["link-wrapper"]}
            onClick={() => setSettings(false)}
          >
            <div className={`${styles["setting"]} ${location.pathname === "/editing_information" ? styles["checked"] : ""}`}>
              <NoDraggableImg src={person} className={styles["setting-icon"]} />
              <span className={styles["setting-text"]}>Настройки</span>
            </div>
          </NoDraggableLink>
          
          <div className={styles["border"]}></div>
          
          <div className={`${styles["setting"]} ${styles["setting-exit"]}`} onClick={exit}>
            <NoDraggableImg src={exitIcon} className={styles["setting-icon"]} />
            <span className={styles["setting-text"]}>Выйти</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Menu;