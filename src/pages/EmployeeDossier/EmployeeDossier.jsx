import { useParams } from "react-router";
import Employee from "@components/Employee/Employee";
import { useEmployees } from "@contexts/EmployeesContext";
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
  const attendance = [
    { date: "2026-03-01", entry_time: "08:00", exit_time: "18:00" },
    { date: "2026-03-02", entry_time: "08:15", exit_time: "18:15" },
    { date: "2026-03-03", entry_time: "08:05", exit_time: "18:05" },
    { date: "2026-03-04", entry_time: "08:10", exit_time: "18:10" },
    { date: "2026-03-05", entry_time: "08:30", exit_time: "18:30" },
    { date: "2026-03-06", entry_time: "08:20", exit_time: "18:20" },
    { date: "2026-03-07", entry_time: "08:25", exit_time: "18:25" },
    { date: "2026-03-08", entry_time: "08:01", exit_time: "18:01" },
    { date: "2026-03-09", entry_time: "08:10", exit_time: "18:10" },
    { date: "2026-03-10", entry_time: "08:30", exit_time: "18:30" },
    { date: "2026-03-11", entry_time: "08:15", exit_time: "18:15" },
    { date: "2026-03-12", entry_time: "08:05", exit_time: "18:05" },
    { date: "2026-03-13", entry_time: "08:20", exit_time: "18:20" },
    { date: "2026-03-14", entry_time: "08:25", exit_time: "18:25" },
    { date: "2026-03-15", entry_time: "08:00", exit_time: "18:00" },
  ];
  if (!employeeData) return <></>;
  return (
    <Employee
      id={id}
      data={{ ...employeeData.profile, email: employeeData.email }}
      isEdit={edit}
      setIsEdit={setEdit}
      bonus={0}
      fine={0}
      attendance={attendance}
      cancelFalseText="Вернуться к изменению"
      saveDialogText="Сохранить изменения?"
      saveFalseText="Вернуться к изменению"
      saveTrueText="Сохранить"
      handleCommand={updateEmployee}
    />
  );
}

export default EmployeeDossier;
