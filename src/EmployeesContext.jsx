import { createContext, useContext, useState } from "react";
import {
  getEmployeeRequest,
  getEmployeesRequest,
  createEmployeeRequest,
  updateEmployeeRequest,
  deleteEmployeeRequest,
} from "./api/employees";

const EmployeesContext = createContext(null);

const useEmployees = () => useContext(EmployeesContext);

function EmployeesProvider({ children }) {
  const [employeesData, setEmployeesData] = useState([]);
  const [employeeData, setEmployeeData] = useState(null);

  const getEmployees = async (q = "") => {
    const response = await getEmployeesRequest(q);
    setEmployeesData(response.data);
    return response.data;
  };

  const getEmployee = async (id) => {
    const response = await getEmployeeRequest(id);
    setEmployeeData(response.data);
    return response.data;
  };

  const createEmployee = async (data) => {
    const response = await createEmployeeRequest(data);
    setEmployeesData((prev) => [...prev, response.data]);
    return response.data;
  };

  const updateEmployee = async (id, data) => {
    const response = await updateEmployeeRequest(id, data);
    const newData = employeesData.map((employee) =>
      employee.id == id ? response.data : employee,
    );
    setEmployeesData(newData);
    setEmployeeData(data);
    return response.data;
  };

  const deleteEmployee = async (id) => {
    const response = await deleteEmployeeRequest(id);
    setEmployeesData((prev) => prev.filter((employee) => employee.id != id));
    return response.data;
  };

  return (
    <EmployeesContext.Provider
      value={{
        employeesData,
        employeeData,
        getEmployees,
        getEmployee,
        createEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
}

export { useEmployees, EmployeesProvider };
