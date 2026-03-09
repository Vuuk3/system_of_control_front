import employee1 from "@assets/employee.jpg";
import employee2 from "@assets/employee2.jpg";
import employee3 from "@assets/employee3.jpg";
import employee4 from "@assets/employee4.jpg";
import employee5 from "@assets/employee5.jpg";
import employee6 from "@assets/employee6.jpg";
import employee7 from "@assets/employee7.jpg";

import styles from "./Salaries.module.css";
import Table from "@components/Table/Table";
import Menu from "@components/Menu/Menu";
import { Link } from "react-router";
import { VALUTA } from "@utils/valuta";
import { salary } from "@utils/icons";

function Salary({
  id,
  photo,
  name,
  position,
  rate_amount,
  rate_type,
  amount_work,
  currency,
  bonus,
  fine,
  salary,
}) {
  return (
    <>
      <tr className={styles["salary"]}>
        <td className={styles["content"]}>
          <Link
            className={styles["link-wrapper"]}
            target="_blank"
            rel="noopener norefferrer"
          >
            <div className={styles["profile"]}>
              <img
                className={styles["profile-logo"]}
                src={photo}
                draggable={false}
              />
              <p className={styles["profile-name"]}>{name}</p>
            </div>
          </Link>
        </td>
        <td className={styles["content"]}>
          <p className={styles["position-p"]}>{position}</p>
        </td>
        <td className={styles["content"]}>
          <p className={styles["rate_amount-p"]}>
            {rate_amount}
            {VALUTA[currency]}
          </p>
        </td>
        <td className={styles["content"]}>
          <p className={styles["amount_work-p"]}>
            {amount_work}
            {rate_type == "hourly" ? "ч" : "с"}
          </p>
        </td>
        <td className={styles["content"]}>
          <p className={styles["bonus-p"]}>
            {bonus}
            {VALUTA[currency]}
          </p>
        </td>
        <td className={styles["content"]}>
          <p className={styles["fine-p"]}>
            {fine}
            {VALUTA[currency]}
          </p>
        </td>
        <td className={styles["content"]}>
          <p className={styles["final_salary-p"]}>
            {salary}
            {VALUTA[currency]}
          </p>
        </td>
      </tr>
    </>
  );
}

function ListSalaries({ salaries }) {
  const test_salaries = [...salaries];
  const logos = [
    employee1,
    employee2,
    employee3,
    employee4,
    employee5,
    employee6,
    employee7,
  ];
  return (
    <>
      {test_salaries.map((salary) => (
        <Salary
          key={salary.id}
          id={salary.id}
          photo={logos[Math.floor(Math.random() * logos.length)]}
          name={salary.full_name}
          position={salary.position}
          rate_amount={salary.rate_amount}
          rate_type={salary.rate_type}
          amount_work={salary.amount_work}
          currency={salary.currency}
          bonus={salary.bonus}
          fine={salary.fine}
          salary={salary.final_salary}
        />
      ))}
    </>
  );
}

function Salaries() {
  const salaries = [
    {
      id: 1,
      full_name: "Дарья Шиханова",
      position: "Звезда",
      rate_amount: 300,
      rate_type: "hourly",
      amount_work: 3,
      currency: "USD",
      bonus: 200,
      fine: 0,
      final_salary: 600,
    },
  ];
  return (
    <>
      <div className={styles["main"]}>
        <Menu header_text="Зарплаты" header_logo={salary} />
        <div className={styles["card"]}>
          <Table
            headers={[
              "ФИО",
              "Должность",
              "Ставка",
              "Количество смен/часов",
              "Премии",
              "Штрафы",
              "Итоговая зарплата",
            ]}
            content={<ListSalaries salaries={salaries} />}
          />
        </div>
      </div>
    </>
  );
}

export default Salaries;
