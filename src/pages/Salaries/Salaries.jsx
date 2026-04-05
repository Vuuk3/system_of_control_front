import employee1 from "@assets/employee.jpg";
import styles from "./Salaries.module.css";
import Table from "@components/Table/Table";
import Menu from "@components/Menu/Menu";
import { VALUTA } from "@utils/valuta";
import { salary } from "@utils/icons";
import Title from "@components/Title/Title";
import { MOCK_SALARIES } from "@utils/mockData";

function Salaries() {
  // Обновленная структура данных для совместимости с новым Table.jsx

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
                content={MOCK_SALARIES}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Salaries;