import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  getMeRequest,
  registerRequest,
  logoutRequest,
} from "@api/auth";
import { useNavigate } from "react-router";

const UserContext = createContext(null);

const useUser = () => useContext(UserContext);

function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const channel = new BroadcastChannel("user");

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data == "exited") {
        navigate("/");
      }
    };
    channel.addEventListener("message", handleMessage);
    return () => channel.removeEventListener("message", handleMessage);
  }, []);

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
    channel.postMessage("exited");
    return response.data;
  };

  return (
    <UserContext.Provider value={{ userData, login, me, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { useUser, UserProvider };
