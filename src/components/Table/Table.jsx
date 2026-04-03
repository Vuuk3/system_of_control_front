import { useState, useRef, useEffect } from "react";
import styles from "./Table.module.css";
import TableHeader from "./TableHeader/TableHeader";
import Cell from "./Cell/Cell";

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
    <div className={styles["table-scroll"]} ref={tableRef}>
      <table className={styles["table"]} style={{ minWidth: width }}>
        <TableHeader headers={headers} />
        <tbody>
          {content.map((cells, i) => (
            <tr key={i}>
              {cells.map((cell, j) => (
                <td className={styles["content"]} key={j}>
                  <Cell props={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
