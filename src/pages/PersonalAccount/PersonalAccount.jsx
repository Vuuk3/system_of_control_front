import { useEffect } from "react";
import ManagerPage from "@pages/ManagerPage/ManagerPage";
import EmployeePage from "@pages/EmployeePage/EmployeePage";
import { useUser } from "@contexts/UserContext";
import { useNavigate } from "react-router";

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
    <EmployeePage props={userData} />
  ) : (
    <UndfinedRolePage />
  );
}

export default PersonalAccount;
