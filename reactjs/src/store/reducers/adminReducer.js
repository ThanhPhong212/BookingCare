import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  positions: [],
  roles: [],
  users: [],
  topDoctors: [],
  doctors: [],
  detaildoctors: [],
  timeSchedule: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //Gender
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };

    //Position
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      };

    //Role
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };

    // GET all user
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };

    //update user
    case actionTypes.UPDATE_USER_SUCCESS:
      state.users = action.data;
      return {
        ...state,
      };
    case actionTypes.UPDATE_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };
    //load top doctor
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      state.topDoctors = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };
    //get all doctor
    case actionTypes.FETCH_DOCTORS_SUCCESS:
      state.doctors = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTORS_FAILED:
      state.doctors = [];
      return {
        ...state,
      };

    //get detail doctor
    case actionTypes.GET_INFO_DOCTORS_SUCCESS:
      state.detaildoctors = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_INFO_DOCTORS_FAILED:
      state.detaildoctors = [];
      return {
        ...state,
      };

    //get time schedule
    case actionTypes.GET_TIME_SCHEDULE_SUCCESS:
      state.timeSchedule = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_TIME_SCHEDULE_FAILED:
      state.timeSchedule = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
