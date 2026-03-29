import styles from "./ProfileCell.module.css";
import NoDraggableImg from "@components/NoDraggableImg/NoDraggableImg";
import NoDraggableLink from "@components/NoDraggableLink/NoDraggableLink";

function ProfileCell({ id, photo, name }) {
  return (
    <>
      <NoDraggableLink
        className={styles["link-wrapper"]}
        to={`/employee/${String(id)}`}
        target="_blank"
        rel="noopener norefferrer"
      >
        <div className={styles["profile"]}>
          <NoDraggableImg className={styles["profile-logo"]} src={photo} />
          <p className={styles["profile-name"]}>{name}</p>
        </div>
      </NoDraggableLink>
    </>
  );
}

export default ProfileCell;
