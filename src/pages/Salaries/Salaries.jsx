import employee1 from "@assets/employee.jpg";
import styles from "./Salaries.module.css";
import Table from "@components/Table/Table";
import Menu from "@components/Menu/Menu";
import { VALUTA } from "@utils/valuta";
import { salary } from "@utils/icons";
import Title from "@components/Title/Title";

function Salaries() {
  // Обновленная структура данных для совместимости с новым Table.jsx
  const salariesData = [
    {
      id: 1,
      employeeData: {}, // Можно передать данные для расписания, если нужно будет открывать его и здесь
      cells: [
        {
          type: "profile",
          id: 1,
          photo: employee1,
          name: "Дарья Шиханова"
        },
        { type: "text", text: "Звезда" },
        { type: "text", text: `300 ${VALUTA["RUB"]}` },
        { type: "text", text: "40" },
        { type: "text", text: `200 ${VALUTA["RUB"]}` },
        { type: "text", text: `0 ${VALUTA["RUB"]}` },
        { type: "text", text: `600 ${VALUTA["RUB"]}` },
      ],
    },
  ];

  return (
    <>
      <Title text="Зарплаты" />
      <div className={styles["main"]}>
        <Menu header_text="Зарплаты" header_logo={salary} />

        <div className={styles["content"]}>
          <div className={styles["card"]}>
            <div className={styles["table-wrapper"]}>
              <Table
                variant="salaries" // Добавили это
                headers={["ФИО", "Должность", "Ставка", "Количество", "Премии", "Штрафы", "Итоговая зарплата"]}
                content={salariesData}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Salaries;