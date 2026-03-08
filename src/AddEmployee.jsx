import { useEmployees } from "./contexts/EmployeesContext";
import Employee from "./Employee/Employee";

function AddEmployee() {
  const data = {
    email: "test@yan.ru",
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
