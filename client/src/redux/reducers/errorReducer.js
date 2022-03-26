import {
  GET_ERRORS,
  GET_LOGIN_ERRORS,
  GET_SIGNUP_ERRORS,
} from "./../actions/types";

const initialState = { loginErrors: {}, signupErrors: {} };

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case GET_LOGIN_ERRORS:
      return {
        ...state,
        signupErrors: {},
        loginErrors: action.payload,
      };
    case GET_SIGNUP_ERRORS:
      return {
        ...state,
        loginErrors: {},
        signupErrors: action.payload,
      };
    default:
      return state;
  }
}
