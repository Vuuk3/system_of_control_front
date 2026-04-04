import { useEmployees } from "@contexts/EmployeesContext";
import { useAvatar } from "@contexts/AvatarContext";
import Employee from "@components/Employee/Employee";
import Title from "@components/Title/Title";

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
  const { setAvatar, url } = useAvatar();
  return (
    <>
      <Title text="Добавление сотрудника" />
      <Employee
        data={data}
        cancelFalseText="Вернуться к добавлению"
        saveDialogText="Добавить сотрудника?"
        saveFalseText="Вернуться к добавлению"
        saveTrueText="Добавить"
        handleCommand={createEmployee}
        setAvatar={setAvatar}
        url={url}
      />
    </>
  );
}

export default AddEmployee;
