import { company, building } from "@utils/icons";
import styles from "./ManagerPage.module.css";
import Menu from "@components/Menu/Menu";
import NoDraggableImg from "@components/NoDraggableImg/NoDraggableImg";

function ManagerPage({ props }) {
  return (
    <>
      <div className={styles["main"]}>
        <Menu header_text="Компания" header_logo={building} />
        <div className={styles["company"]}>
          <NoDraggableImg className={styles["company_img"]} src={company} />
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
