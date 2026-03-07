import { createContext, useContext, useState } from "react";
import {
  loginRequest,
  getMeRequest,
  registerRequest,
  logoutRequest,
} from "../api/auth";

const UserContext = createContext(null);

const useUser = () => useContext(UserContext);

function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);

  const login = async (data) => {
    const response = await loginRequest(data);
    return response.data;
  };

  const register = async (data) => {
    const response = await registerRequest(data);
    return response.data;
  };

  const me = async () => {
    const response = await getMeRequest();
    setUserData(response.data);
    return response.data;
  };

  const logout = async () => {
    const response = await logoutRequest();
    setUserData(null);
    return response.data;
  };

  return (
    <UserContext.Provider value={{ userData, login, me, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { useUser, UserProvider };
