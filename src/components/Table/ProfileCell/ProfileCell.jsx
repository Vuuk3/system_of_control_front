import styles from "./ProfileCell.module.css";
import NoDraggableImg from "@components/NoDraggableImg/NoDraggableImg";
import NoDraggableLink from "@components/NoDraggableLink/NoDraggableLink";

function ProfileCell({ id, photo, name }) {
  return (
    <NoDraggableLink
      className={styles["link-wrapper"]}
      to={`/employee/${String(id)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles["profile"]}>
        <NoDraggableImg className={styles["avatar"]} src={photo} />
        <p className={styles["name"]}>{name}</p>
      </div>
    </NoDraggableLink>
  );
}
export default ProfileCell;