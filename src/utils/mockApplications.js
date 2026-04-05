export const MOCK_APPLICATIONS = [
    {
        id: 1,
        full_name: "Смирнов Алексей Игоревич",
        phone: "+7 (999) 123-45-67",
        email: "smirnov.a@example.com",
        expected_position: "Frontend Разработчик",
        expected_salary: 120000,
        currency: "RUB",
        // Желаемые дни работы: 1 (Пн), 3 (Ср), 5 (Пт)
        preferred_weekdays: [1, 3, 5],
    },
    {
        id: 2,
        full_name: "Кузнецова Анна Сергеевна",
        phone: "+7 (900) 765-43-21",
        email: "kuznetsova@example.com",
        expected_position: "Менеджер проектов",
        expected_salary: 90000,
        currency: "RUB",
        // Желаемые дни работы: 1, 2, 3, 4, 5 (Пн-Пт)
        preferred_weekdays: [1, 2, 3, 4, 5],
    },
    {
        id: 3,
        full_name: "Васильев Дмитрий Олегович",
        phone: "+7 (911) 111-22-33",
        email: "vasiliev.d@example.com",
        expected_position: "Дизайнер",
        expected_salary: 100000,
        currency: "RUB",
        // Желаемые дни: 0, 6 (Сб, Вс)
        preferred_weekdays: [0, 6],
    }
];

// Функция для генерации дат на 2 месяца вперед на основе выбранных дней недели
export function generateScheduleFromWeekdays(weekdays) {
    const days = [];
    const start = new Date();
    start.setDate(1); // С начала текущего месяца

    const end = new Date();
    end.setMonth(end.getMonth() + 2); // На 2 месяца вперед

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if (weekdays.includes(d.getDay())) {
            days.push({
                date: d.toISOString(),
                start_time: "09:00:00",
                end_time: "18:00:00",
            });
        }
    }
    return days;
}