import { useEffect, useState } from "react";

function AdminPage() {
  return (
    <>
      <h1>Админ</h1>
    </>
  );
}

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
  const [role, setRole] = useState("");
  const URL = "http://localhost:8001/api/auth/me";
  useEffect(() => {
    (fetch(URL, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((answer) =>
        answer.detail == "Not authenticated"
          ? (window.location.pathname = "/login")
          : setRole(answer.role),
      )
      .catch(() => {}),
      []);
  });
  return role == "admin" ? (
    <AdminPage />
  ) : role == "employee" ? (
    <EmployeePage />
  ) : (
    <UndfinedRolePage />
  );
}

export default PersonalAccount;
