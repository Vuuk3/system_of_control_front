import api from "./api";

export const setAvatarRequest = (file) => {
  return api.post("/employees/avatar", file, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const changeAvatarRequest = (id, file) => {
  return api.put(`/employees/${id}/avatar`, file, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteAvatarRequest = (id) => {
  return api.delete(`/employees/${id}/avatar`);
};
