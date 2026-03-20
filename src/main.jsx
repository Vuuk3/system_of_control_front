import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import "./index.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MainPage from "./pages/MainPage/MainPage";
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount";
import EditInformation from "./pages/EditInformation/EditInformation";
import Employees from "./pages/Employees/Employees";
import AddEmployee from "./pages/AddEmployee/AddEmployee";
import EmployeeDossier from "./pages/EmployeeDossier/EmployeeDossier";
import { UserProvider } from "./contexts/UserContext";
import { CompanyProvider } from "./contexts/CompanyContext";
import { EmployeesProvider } from "./contexts/EmployeesContext";
import Salaries from "./pages/Salaries/Salaries";
import { CheckAuthProvider } from "./contexts/CheckAuthContext";

function UserLayout() {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
}

function CheckAuthLayout() {
  return (
    <CheckAuthProvider>
      <Outlet />
    </CheckAuthProvider>
  );
}

function CompanyLayout() {
  return (
    <CompanyProvider>
      <Outlet />
    </CompanyProvider>
  );
}

function EmployeesLayout() {
  return (
    <EmployeesProvider>
      <Outlet />
    </EmployeesProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route element={<UserLayout />}>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<CheckAuthLayout />}>
          <Route path="/personal_account" element={<PersonalAccount />}></Route>
          <Route element={<CompanyLayout />}>
            <Route
              path="/editing_information"
              element={<EditInformation />}
            ></Route>
          </Route>
          <Route element={<EmployeesLayout />}>
            <Route path="/employees" element={<Employees />}></Route>
            <Route path="/add_employee" element={<AddEmployee />}></Route>
            <Route path="/employee/:id" element={<EmployeeDossier />}></Route>
          </Route>
          <Route path="/salaries" element={<Salaries />}></Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
);
