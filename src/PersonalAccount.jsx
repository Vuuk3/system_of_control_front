import { useEffect } from "react";
import ManagerPage from "./ManagerPage";
import { useUser } from "./contexts/UserContext";
import { useNavigate } from "react-router";

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
  const { me, logout, userData } = useUser();
  const navigation = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await me();
      } catch (err) {
        navigation("/login");
      }
    };
    checkAuth();
  }, []);
  if (!userData) return <></>;
  return userData.role == "admin" ? (
    <ManagerPage props={userData} logout={logout} />
  ) : userData.role == "employee" ? (
    <EmployeePage />
  ) : (
    <UndfinedRolePage />
  );
}

export default PersonalAccount;
