import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import MainPage from "./MainPage.jsx";
import PersonalAccount from "./PersonalAccount.jsx";
import ManagerPage from "./ManagerPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/personal_account" element={<PersonalAccount />}></Route>
      <Route path="/manager" element={<ManagerPage />}></Route>
    </Routes>
  </BrowserRouter>,
);
