import employee1 from "@assets/employee.jpg";

import styles from "./Salaries.module.css";
import Table from "@components/Table/Table";
import Menu from "@components/Menu/Menu";
import { VALUTA } from "@utils/valuta";
import { salary } from "@utils/icons";
import Title from "@components/Title/Title";

function Salaries() {
  const salaries = [
    [
      { type: "text", text: "1" },
      { type: "profile", id: 1, photo: employee1, name: "Дарья Шиханова" },
      { type: "text", text: "Звезда" },
      { type: "text", text: "300" + VALUTA["RUB"] },
      { type: "text", text: "40" },
      { type: "text", text: "200" + VALUTA["RUB"] },
      { type: "text", text: "0" + VALUTA["RUB"] },
      { type: "text", text: "600" + VALUTA["RUB"] },
    ],
  ];
  return (
    <>
      <Title text="Зарплаты" />
      <div className={styles["main"]}>
        <Menu header_text="Зарплаты" header_logo={salary} />
        <div className={styles["card"]}>
          <Table
            headers={[
              "ID",
              "ФИО",
              "Должность",
              "Ставка",
              "Количество смен/часов",
              "Премии",
              "Штрафы",
              "Итоговая зарплата",
            ]}
            content={salaries}
          />
        </div>
      </div>
    </>
  );
}

export default Salaries;
