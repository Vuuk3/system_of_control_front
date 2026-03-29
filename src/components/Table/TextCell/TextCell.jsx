import styles from "./TextCell.module.css";

function TextCell({ data }) {
  return (
    <>
      <p className={styles["content-p"]}>{data}</p>
    </>
  );
}

export default TextCell;
