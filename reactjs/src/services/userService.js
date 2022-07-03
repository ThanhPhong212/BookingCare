import axios from "../axios";

const handleLoginAPI = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUser = (data) => {
  return axios.post("/api/create-user", data);
};

const editUser = (data) => {
  return axios.put("/api/edit-user", data);
};

const deleteUser = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const getAllCode = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor?limit=${limit}`);
};
const getAllDoctorService = () => {
  return axios.get(`/api/all-doctor`);
};

const saveInfoDoctorService = (data) => {
  return axios.post(`/api/save-info-doctor`, data);
};

const getDetailDoctorService = (id) => {
  return axios.get(`/api/get-info-doctor?id=${id}`);
};
export {
  handleLoginAPI,
  getAllUsers,
  createNewUser,
  editUser,
  deleteUser,
  getAllCode,
  getTopDoctorHomeService,
  getAllDoctorService,
  saveInfoDoctorService,
  getDetailDoctorService,
};
