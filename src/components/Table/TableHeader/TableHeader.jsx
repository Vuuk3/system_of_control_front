import styles from "./TableHeader.module.css";

function TableHeader({ headers }) {
  return (
    <thead>
      <tr>
        {headers.map((h) => (
          <th key={h} className={styles["table-header"]}>
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
