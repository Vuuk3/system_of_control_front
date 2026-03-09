import { useState, useRef, useEffect } from "react";
import styles from "./Table.module.css";
import TableHeader from "./TableHeader/TableHeader";

function Table({ headers, content }) {
  const [width, setWidth] = useState(0);
  const tableRef = useRef(null);
  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;
    const resizeObserver = new ResizeObserver(() => {
      setWidth(table.clientWidth);
    });

    resizeObserver.observe(table);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <div className={styles["table-wrapper"]} ref={tableRef}>
      <table className={styles["table"]} style={{ minWidth: width }}>
        <TableHeader headers={headers} />
        <tbody>{content}</tbody>
      </table>
    </div>
  );
}

export default Table;
