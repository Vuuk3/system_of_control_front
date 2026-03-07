import styles from "./AddEmployee.module.css";
import { useEmployees } from "./EmployeesContext";
import Employee from "./Employee";

function AddEmployee() {
  const data = {
    email: "test@yan.ru",
    password: "",
    full_name: "Dd Dd",
    phone: "",
    position: "",
    rate_type: "hourly",
    rate_amount: 0,
    currency: "RUB",
  };
  const { createEmployee } = useEmployees();
  return (
    <Employee
      data={data}
      cancelFalseText="Вернуться к добавлению"
      saveDialogText="Добавить сотрудника?"
      saveFalseText="Вернуться к добавлению"
      saveTrueText="Добавить"
      handleCommand={createEmployee}
    />
  );
}

export default AddEmployee;
