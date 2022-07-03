import actionTypes from "./actionTypes";
import {
  getAllCode,
  createNewUser,
  getAllUsers,
  deleteUser,
  editUser,
  getTopDoctorHomeService,
  getAllDoctorService,
  saveInfoDoctorService,
  getDetailDoctorService,
} from "../../services/userService";
import { toast } from "react-toastify";

//gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCode("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSucess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log(e);
    }
  };
};
export const fetchGenderSucess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

//Position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("position");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSucess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log(e);
    }
  };
};
export const fetchPositionSucess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//Role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSucess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log(e);
    }
  };
};
export const fetchRoleSucess = (RoleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: RoleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

//Create user
export const createNewUsers = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUser(data);
      if (res && res.errCode === 0) {
        toast.success("Create a new user succeed !");
        dispatch(createUserSucess());
        dispatch(getAllUser());
      }
      if (res && res.errCode === 1) {
        toast.warn("Your email is already in the system !");
        dispatch(createUserFailed());
      }
    } catch (e) {
      toast.warn("Create user failed !");
      dispatch(createUserFailed());
      console.log(e);
    }
  };
};
export const createUserSucess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

//get all user
export const getAllUser = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(getAllUserSucess(res.users.reverse()));
      } else {
        dispatch(getAllUserFailed());
      }
    } catch (e) {
      dispatch(getAllUserFailed());
      console.log(e);
    }
  };
};
export const getAllUserSucess = (userData) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  data: userData,
});
export const getAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

//delete User
export const deletUsers = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUser(user);
      if (res && res.errCode === 0) {
        toast.success("Delete user succeed !");
        dispatch(deleteUserSucess());
        dispatch(getAllUser());
      } else {
        toast.warn("Delete user failed!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.warn("Delete user failed!");
      dispatch(deleteUserFailed());
      console.log(e);
    }
  };
};
export const deleteUserSucess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

//UPDATE
export const updateUsers = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUser(user);
      if (res && res.errCode === 0) {
        toast.success("Update user succeed !");
        dispatch(updateUserSucess());
        dispatch(getAllUser());
      } else {
        toast.warn("Update user failed!");
        dispatch(updateUserFailed());
      }
    } catch (e) {
      toast.warn("Update user failed!");
      dispatch(updateUserFailed());
      console.log(e);
    }
  };
};
export const updateUserSucess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
});
export const updateUserFailed = () => ({
  type: actionTypes.UPDATE_USER_FAILED,
});

//LOAD TOP DOCTOR
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("10");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};

//get all doctor
export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_DOCTORS_SUCCESS,

          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log(e);

      dispatch({
        type: actionTypes.FETCH_DOCTORS_FAILED,
      });
    }
  };
};

// CREATE INFO DOCTOR
export const createInfoDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveInfoDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Save succeed !");
        dispatch({
          type: actionTypes.SAVE_INFO_DOCTORS_SUCCESS,
          data: res.data,
        });
      } else {
        toast.warn("Save failed !");
        dispatch({
          type: actionTypes.SAVE_INFO_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Erro: Save failed !");
      dispatch({
        type: actionTypes.SAVE_INFO_DOCTORS_FAILED,
      });
    }
  };
};

//get info doctor
export const getInfoDoctor = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getDetailDoctorService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_INFO_DOCTORS_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_INFO_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_INFO_DOCTORS_FAILED,
      });
    }
  };
};

//GET TIME SCHEDULE
export const getTimeSchedule = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("time");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_TIME_SCHEDULE_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_TIME_SCHEDULE_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_TIME_SCHEDULE_FAILED,
      });
    }
  };
};
