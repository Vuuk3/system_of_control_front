import styles from "./ShiftEmployeeList.module.css";
import CardHeader from "@components/Employee/CardHeader/CardHeader";
import { person } from "@utils/icons";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

function ShiftEmployeeList({ selectedDate, employeesAtDay }) {
    return (
        <div className={styles["card"]}>
            <CardHeader
                text={selectedDate ? format(selectedDate, "d MMMM", { locale: ru }) : "Сотрудники"}
                logo={person}
            />
            <div className={styles["list-wrapper"]}>
                {employeesAtDay.length > 0 ? (
                    employeesAtDay.map((emp) => (
                        <div key={emp.id} className={styles["emp-row"]}>
                            <div className={styles["emp-main"]}>
                                <p className={styles["emp-name"]}>{emp.name}</p>
                                <p className={styles["emp-pos"]}>{emp.pos}</p>
                            </div>
                            <div className={styles["emp-time-badge"]}>{emp.time}</div>
                        </div>
                    ))
                ) : (
                    <div className={styles["empty-box"]}>
                        <p>{selectedDate ? "Нет смен на этот день" : "Выберите дату для просмотра сотрудников"}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShiftEmployeeList;