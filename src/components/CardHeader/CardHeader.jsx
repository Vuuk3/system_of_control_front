import NoDraggableImg from "@components/NoDraggableImg/NoDraggableImg";
import styles from "./CardHeader.module.css";

function CardHeader({ text, logo }) {
  return (
    <div className={styles["card_header"]}>
      <NoDraggableImg className={styles["card_header-logo"]} src={logo} />
      <h2 className={styles["card_header-h2"]}>{text}</h2>
    </div>
  );
}

export default CardHeader;
