import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

const useUser = () => useContext(UserContext);

function UserProvider({ children }) {
  const [userData, setUserData] = useState({});

  const URL = "http://localhost:8001/api/auth/me";
  useEffect(() => {
    fetch(URL, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((answer) => setUserData(answer))
      .catch(() => {});
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export { useUser, UserProvider };
