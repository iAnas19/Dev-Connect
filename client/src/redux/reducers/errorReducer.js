import {
  GET_LOGIN_ERRORS,
  GET_SIGNUP_ERRORS,
  GET_PROFILE_ERRORS,
  GET_DELETE_ERRORS,
} from "./../actions/types";

const initialState = {
  profileErrors: {},
  loginErrors: {},
  signupErrors: {},
  deleteErrors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_ERRORS:
      return {
        ...state,
        signupErrors: {},
        loginErrors: {},
        deleteErrors: {},
        profileErrors: action.payload,
      };
    case GET_DELETE_ERRORS:
      return {
        ...state,
        signupErrors: {},
        loginErrors: {},
        profileErrors: {},
        deleteErrors: action.payload,
      };
    case GET_LOGIN_ERRORS:
      return {
        ...state,
        profileErrors: {},
        signupErrors: {},
        deleteErrors: {},
        loginErrors: action.payload,
      };
    case GET_SIGNUP_ERRORS:
      return {
        ...state,
        profileErrors: {},
        loginErrors: {},
        deleteErrors: {},
        signupErrors: action.payload,
      };
    default:
      return state;
  }
}
