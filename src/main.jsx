import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import "./index.css";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import MainPage from "./MainPage.jsx";
import PersonalAccount from "./PersonalAccount.jsx";
import { UserProvider } from "./UserContext.jsx";
import EditInformation from "./EditInformation.jsx";
import Employees from "./Employees.jsx";
import AddEmployee from "./AddEmployee.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/employees" element={<Employees />}></Route>
      <Route path="/add_employee" element={<AddEmployee />}></Route>
      <Route
        element={
          <UserProvider>
            <Outlet />
          </UserProvider>
        }
      >
        <Route
          path="/editing_information"
          element={<EditInformation />}
        ></Route>
        <Route path="/personal_account" element={<PersonalAccount />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
);
