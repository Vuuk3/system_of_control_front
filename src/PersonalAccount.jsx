import { useEffect } from "react";
import ManagerPage from "./ManagerPage";
import { useUser } from "./UserContext";

function EmployeePage() {
  return (
    <>
      <h1>Сотрудник</h1>
    </>
  );
}

function UndfinedRolePage() {
  return (
    <>
      <h1></h1>
    </>
  );
}

function PersonalAccount() {
  const { userData } = useUser();
  if (userData.detail == "Not authenticated") {
    window.location.pathname = "/login";
  }
  return userData.role == "admin" ? (
    <ManagerPage props={userData} />
  ) : userData.role == "employee" ? (
    <EmployeePage />
  ) : (
    <UndfinedRolePage />
  );
}

export default PersonalAccount;
