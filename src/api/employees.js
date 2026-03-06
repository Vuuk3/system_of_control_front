import api from "./api";

export const getEmployeesRequest = () => {
  return api.get("/employees");
};

export const createEmployeeRequest = (data) => {
  return api.post("/employees", data);
};

export const getEmployeeRequest = (id) => {
  return api.get(`/employees/${id}`);
};

export const updateEmployeeRequest = (id, data) => {
  return api.patch(`/employees/${id}`, data);
};

export const deleteEmployeeRequest = (id) => {
  return api.delete(`/employees/${id}`);
};
