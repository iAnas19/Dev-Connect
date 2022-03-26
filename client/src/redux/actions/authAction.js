import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, GET_LOGIN_ERRORS, GET_SIGNUP_ERRORS } from "./types";

// Register user
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((errSignup) =>
      dispatch({ type: GET_SIGNUP_ERRORS, payload: errSignup.response.data })
    );
};

// Login - Get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      //Save to localStorage
      const { token } = res.data;
      //Set token to ls
      localStorage.setItem("jwtToken", token);
      //Set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((errLogin) =>
      dispatch({ type: GET_LOGIN_ERRORS, payload: errLogin.response.data })
    );
};

// logout
export const logoutCurrentUser = () => (dispatch) => {
  //Remove Token from localStorage
  localStorage.removeItem("jwtToken");
  //Remove auth header
  setAuthToken(false);
  //Set current user to empty and isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Set Login user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
