import api from "./api";

export const getCompanyRequest = () => {
  return api.get("/company");
};

export const updateCompanyRequest = (data) => {
  return api.patch("/company", data);
};
