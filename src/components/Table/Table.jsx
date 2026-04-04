import React, { useState } from "react";
import styles from "./Table.module.css";
import TableHeader from "./TableHeader/TableHeader";
import Cell from "./Cell/Cell";
import Schedule from "@components/Employee/Schedule/Schedule";
import { calendar } from "@utils/icons";

function Table({ headers, content, variant = "default" }) {
  const [expanded, setExpanded] = useState(new Set());

  const toggleRow = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={`${styles["table-container"]} ${styles[variant]}`}>
      <table className={styles["table"]}>
        <TableHeader headers={headers} />
        <tbody>
          {content.map((row) => (
            <React.Fragment key={row.id}>
              {/* Основная строка */}
              <tr className={styles["table-row"]}>
                {row.cells.map((cell, j) => (
                  <td className={styles["cell"]} key={j}>
                    <Cell props={{ ...cell, onAction: toggleRow }} />
                  </td>
                ))}
              </tr>

              {/* Выпадающее расписание */}
              {expanded.has(row.id) && (
                <tr className={styles["expanded-row"]}>
                  <td colSpan={headers.length} className={styles["expanded-cell"]}>
                    <div className={styles["expanded-inner"]}>
                      <Schedule
                        text={`Расписание: ${row.cells[0].name}`} // Показываем чье это расписание
                        cardLogo={calendar}
                        days={row.employeeData.schedule || []}
                        setDays={() => {}} // Только для чтения
                        rate_type={row.employeeData.profile?.rate_type || "hourly"}
                        rate_amount={row.employeeData.profile?.rate_amount || 0}
                      />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;