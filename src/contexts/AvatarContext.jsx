import { createContext, useContext, useState } from "react";
import {
  setAvatarRequest,
  changeAvatarRequest,
  deleteAvatarRequest,
} from "@api/avatar";

const AvatarContext = createContext(null);

const useAvatar = () => useContext(AvatarContext);

function AvatarProvider({ children }) {
  const [url, setUrl] = useState(null);

  const setAvatar = async (file) => {
    const response = await setAvatarRequest(file);
    setUrl(response.data);
    return response.data;
  };

  const changeAvatar = async (id, file) => {
    const response = await changeAvatarRequest(id, file);
    setUrl(response.data);
    return response.data;
  };

  const deleteAvatar = async (id) => {
    const response = await deleteAvatarRequest(id);
    setUrl(null);
    return response.data;
  };

  return (
    <AvatarContext.Provider
      value={{ url, setAvatar, changeAvatar, deleteAvatar }}
    >
      {children}
    </AvatarContext.Provider>
  );
}

export { useAvatar, AvatarProvider };
