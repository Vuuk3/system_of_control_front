import { useEffect } from "react";
import ManagerPage from "@pages/ManagerPage/ManagerPage";
import { useUser } from "@contexts/UserContext";
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
  const { me, userData } = useUser();
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
    <ManagerPage props={userData} />
  ) : userData.role == "employee" ? (
    <EmployeePage />
  ) : (
    <UndfinedRolePage />
  );
}

export default PersonalAccount;
