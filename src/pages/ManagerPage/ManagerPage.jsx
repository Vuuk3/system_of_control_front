import { company, building } from "@utils/icons";
import styles from "./ManagerPage.module.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Menu from "@components/Menu/Menu";

function ManagerPage({ props, logout }) {
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
        <Menu header_text="Компания" header_logo={building} exit={exit} />
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
