import api from "./api";

export const loginRequest = (data) => {
  return api.post("/auth/login", data);
};

export const registerRequest = (data) => {
  return api.post("/auth/register", data);
};

export const getMeRequest = () => {
  return api.get("/auth/me");
};

export const logoutRequest = () => {
  return api.post("/auth/logout");
};
