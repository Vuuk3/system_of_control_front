import employee1 from "@assets/employee.jpg";
import { format } from "date-fns";

// ── 1. Зарплаты (Для страницы Salaries) ──
export const MOCK_SALARIES = [
  {
    id: 1,
    employeeData: {}, 
    cells: [
      { type: "profile", id: 1, photo: employee1, name: "Дарья Шиханова" },
      { type: "text", text: "Звезда" },
      { type: "text", text: "300 ₽" },
      { type: "text", text: "40" },
      { type: "text", text: "200 ₽" },
      { type: "text", text: "0 ₽" },
      { type: "text", text: "600 ₽" },
    ],
  },
];

// ── 2. Дашборд Администратора (Для ManagerPage) ──
export const MOCK_DASHBOARD_STATS = {
  expenses: "1 250 000 ₽",
  bonuses: "45 000 ₽",
  fines: "12 500 ₽",
  employeesCount: "24",
};

// ── 3. Расписание для таблицы сотрудников (Для Employees) ──
// Если бэкенд не возвращает расписание, подставляем на 2 дня вперед
const today = new Date();
export const MOCK_EMPLOYEE_SCHEDULE = [
  {
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString(),
    start_time: "08:00:00",
    end_time: "18:00:00",
  },
  {
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).toISOString(),
    start_time: "09:00:00",
    end_time: "17:00:00",
  },
];

// ── 4. Смены сотрудников (Для ShiftSchedule) ──
export const MOCK_SHIFT_SCHEDULE = {
  [format(new Date(), "yyyy-MM-dd")]: [
    { id: 1, name: "Дарья Шиханова", pos: "Звезда", time: "08:00 — 18:00" },
    { id: 2, name: "Иван Иванов", pos: "Менеджер", time: "09:00 — 17:00" },
    { id: 3, name: "Алексей Петров", pos: "Разработчик", time: "10:00 — 19:00" },
  ],
  "2023-10-28": [
    { id: 4, name: "Мария Сидорова", pos: "Дизайнер", time: "08:00 — 16:00" },
  ],
};

// ── 5. Заявки кандидатов (Для Applications и ApplicationDetail) ──
export const MOCK_APPLICATIONS = [
  {
    id: 1,
    full_name: "Смирнов Алексей Игоревич",
    phone: "+7 (999) 123-45-67",
    email: "smirnov.a@example.com",
    expected_position: "Frontend Разработчик",
    expected_salary: 120000,
    currency: "RUB",
    preferred_weekdays: [1, 3, 5], // Пн, Ср, Пт
  },
  {
    id: 2,
    full_name: "Кузнецова Анна Сергеевна",
    phone: "+7 (900) 765-43-21",
    email: "kuznetsova@example.com",
    expected_position: "Менеджер проектов",
    expected_salary: 90000,
    currency: "RUB",
    preferred_weekdays: [1, 2, 3, 4, 5], // Пн-Пт
  },
];

// Утилита для заявок (генерация дат на основе выбранных дней недели)
export function generateScheduleFromWeekdays(weekdays) {
  const days = [];
  const start = new Date();
  start.setDate(1); 
  const end = new Date();
  end.setMonth(end.getMonth() + 2); 

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