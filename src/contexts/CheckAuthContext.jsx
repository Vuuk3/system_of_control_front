import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "./UserContext";

const CheckAuthContext = createContext(null);

const useCheckAuth = () => useContext(CheckAuthContext);

function CheckAuthProvider({ children }) {
  const navigate = useNavigate();
  const channel = new BroadcastChannel("user");
  const { userData, me } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await me();
      } catch (err) {
        navigate("/login");
      }
    };
    checkAuth();

    const handleMessage = (event) => {
      if (event.data == "exited") {
        navigate("/");
      }
    };
    channel.addEventListener("message", handleMessage);
    return () => channel.removeEventListener("message", handleMessage);
  }, []);

  if (!userData) return <></>;

  return <CheckAuthContext.Provider>{children}</CheckAuthContext.Provider>;
}

export { useCheckAuth, CheckAuthProvider };
