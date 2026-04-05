import { useState } from "react";
import styles from "./ShiftSchedule.module.css";
import Menu from "@components/Menu/Menu";
import Title from "@components/Title/Title";
import { scheduleIcon } from "@utils/icons";
import { format } from "date-fns";

import ShiftCalendar from "@components/ShiftCalendar/ShiftCalendar";
import ShiftEmployeeList from "@components/ShiftEmployeeList/ShiftEmployeeList";

// Моковые данные: дата -> список сотрудников
const MOCK_DATA = {
    [format(new Date(), "yyyy-MM-dd")]: [
        { id: 1, name: "Дарья Шиханова", pos: "Звезда", time: "08:00 — 18:00" },
        { id: 2, name: "Иван Иванов", pos: "Менеджер", time: "09:00 — 17:00" },
        { id: 3, name: "Алексей Петров", pos: "Разработчик", time: "10:00 — 19:00" },
    ],
    "2023-10-28": [
        { id: 4, name: "Мария Сидорова", pos: "Дизайнер", time: "08:00 — 16:00" },
    ],
};

function ShiftSchedule() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
    const employeesAtDay = dateKey ? MOCK_DATA[dateKey] || [] : [];

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
                            shiftData={MOCK_DATA}
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