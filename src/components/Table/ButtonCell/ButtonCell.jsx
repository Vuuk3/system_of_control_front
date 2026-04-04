import styles from "./ButtonCell.module.css";
import NoDraggableImg from "@components/NoDraggableImg/NoDraggableImg";
import NoDraggableLink from "@components/NoDraggableLink/NoDraggableLink";

function ButtonCell({ id, mode, icon, onAction }) {
  return (
    <div className={styles["cell-center"]}>
      {mode === "dossier" ? (
        <NoDraggableLink
          className={styles["action-btn"]}
          to={`/employee/${String(id)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <NoDraggableImg className={styles["icon"]} src={icon} />
        </NoDraggableLink>
      ) : (
        <button 
          className={styles["action-btn"]} 
          onClick={() => onAction && onAction(id)}
          title="Открыть расписание"
        >
          <NoDraggableImg className={styles["icon"]} src={icon} />
        </button>
      )}
    </div>
  );
}

export default ButtonCell;