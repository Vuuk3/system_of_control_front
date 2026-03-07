import { useParams } from "react-router";
import Employee from "./Employee/Employee";
import { useEmployees } from "./contexts/EmployeesContext";
import { useEffect, useState } from "react";

function EmployeeDossier() {
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const { employeeData, getEmployee, updateEmployee } = useEmployees();
  useEffect(() => {
    const checkEmployee = async (id) => {
      try {
        await getEmployee(id);
      } catch (err) {
        window.close();
      }
    };
    if (id) checkEmployee(id);
  }, [id]);

  if (!employeeData) return <></>;
  return (
    <Employee
      id={id}
      data={{ ...employeeData.profile, email: employeeData.email }}
      isEdit={edit}
      setIsEdit={setEdit}
      bonus={0}
      fine={0}
      cancelFalseText="Вернуться к изменению"
      saveDialogText="Сохранить изменения?"
      saveFalseText="Вернуться к изменению"
      saveTrueText="Сохранить"
      handleCommand={updateEmployee}
    />
  );
}

export default EmployeeDossier;
