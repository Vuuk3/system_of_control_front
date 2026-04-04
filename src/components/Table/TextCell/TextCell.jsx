import styles from "./TextCell.module.css";

function TextCell({ data }) {
  return <p className={styles["text"]}>{data}</p>;
}
export default TextCell;