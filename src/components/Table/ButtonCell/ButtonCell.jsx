import styles from "./ButtonCell.module.css";
import NoDraggableImg from "@components/NoDraggableImg/NoDraggableImg";
import NoDraggableLink from "@components/NoDraggableLink/NoDraggableLink";

function ButtonCell({ id, mode, icon }) {
  return (
    <>
      {mode == "dossier" ? (
        <NoDraggableLink
          className={styles["dossier-button"]}
          to={`/employee/${String(id)}`}
          target="_blank"
          rel="noopener norefferrer"
        >
          <NoDraggableImg className={styles["dossier-logo"]} src={icon} />
        </NoDraggableLink>
      ) : (
        <button className={styles["schedule-button"]}>
          <NoDraggableImg className={styles["schedule-logo"]} src={icon} />
        </button>
      )}
    </>
  );
}

export default ButtonCell;
