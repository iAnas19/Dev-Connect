import {
  GET_LOGIN_ERRORS,
  GET_SIGNUP_ERRORS,
  GET_PROFILE_ERRORS,
  GET_DELETE_ERRORS,
  GET_DASHBOARD_ERRORS,
} from "./../actions/types";

const initialState = {
  profileErrors: {},
  loginErrors: {},
  signupErrors: {},
  deleteErrors: {},
  dashboardErrors: {},
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_ERRORS:
      return {
        ...state,
        signupErrors: {},
        loginErrors: {},
        deleteErrors: {},
        profileErrors: action.payload,
        dashboardErrors: {},
      };
    case GET_DELETE_ERRORS:
      return {
        ...state,
        signupErrors: {},
        loginErrors: {},
        profileErrors: {},
        deleteErrors: action.payload,
        dashboardErrors: {},
      };
    case GET_LOGIN_ERRORS:
      return {
        ...state,
        profileErrors: {},
        signupErrors: {},
        deleteErrors: {},
        loginErrors: action.payload,
        dashboardErrors: {},
      };
    case GET_SIGNUP_ERRORS:
      return {
        ...state,
        profileErrors: {},
        loginErrors: {},
        deleteErrors: {},
        signupErrors: action.payload,
        dashboardErrors: {},
      };
    case GET_DASHBOARD_ERRORS:
      return {
        ...state,
        profileErrors: {},
        loginErrors: {},
        deleteErrors: {},
        signupErrors: {},
        dashboardErrors: action.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;
