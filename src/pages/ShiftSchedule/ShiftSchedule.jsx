import { useState } from "react";
import styles from "./ShiftSchedule.module.css";
import Menu from "@components/Menu/Menu";
import Title from "@components/Title/Title";
import { scheduleIcon } from "@utils/icons";
import { format } from "date-fns";

import ShiftCalendar from "@components/ShiftCalendar/ShiftCalendar";
import ShiftEmployeeList from "@components/ShiftEmployeeList/ShiftEmployeeList";
import { MOCK_SHIFT_SCHEDULE } from "@utils/mockData";

// Моковые данные: дата -> список сотрудников
function ShiftSchedule() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
    const employeesAtDay = dateKey ? MOCK_SHIFT_SCHEDULE[dateKey] || [] : [];

    return (
        <>
            <Title text="Расписание смен" />
            <div className={styles["main"]}>
                <Menu header_text="Расписание" header_logo={scheduleIcon} />

                <div className={styles["content"]}>
                    <div className={styles["grid"]}>
                        <ShiftCalendar
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            shiftData={MOCK_SHIFT_SCHEDULE}
                        />
                        <ShiftEmployeeList
                            selectedDate={selectedDate}
                            employeesAtDay={employeesAtDay}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShiftSchedule;