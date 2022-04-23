import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILE_ERRORS,
  SET_CURRENT_USER,
  GET_DELETE_ERRORS,
  GET_DASHBOARD_ERRORS,
} from "./types";

// Get current profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

// Create profile
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile", profileData)
    .then((res) => history.push("/dashboard"))
    .catch((errProfile) =>
      dispatch({
        type: GET_PROFILE_ERRORS,
        payload: errProfile.response.data,
      })
    );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

// Delete account and profile
export const deleteAccount = () => (dispatch) => {
  if (window.confirm("Are  you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then((res) =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch((errDelete) =>
        dispatch({
          type: GET_DELETE_ERRORS,
          payload: errDelete.response.data,
        })
      );
  }
};

// Add Experience
export const addExperience = (expData, history) => (dispatch) => {
  axios
    .post("/api/profile/experience", expData)
    .then((res) => history.push("/dashboard"))
    .catch((errDash) =>
      dispatch({
        type: GET_DASHBOARD_ERRORS,
        payload: errDash.response.data,
      })
    );
};

// Add Education
export const addEducation = (eduData, history) => (dispatch) => {
  axios
    .post("/api/profile/education", eduData)
    .then((res) => history.push("/dashboard"))
    .catch(
      (errDash) =>
        console.log(errDash) &&
        dispatch({
          type: GET_DASHBOARD_ERRORS,
          payload: errDash.response.data,
        })
    );
};

// Delete experience
export const deleteExperience = (expId) => (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete(`/api/profile/experience/${expId}`)
      .then((res) =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        })
      )
      .catch((errDelete) =>
        dispatch({
          type: GET_DELETE_ERRORS,
          // payload: errDelete.response.data,
          paylad: { msg: errDelete },
        })
      );
  }
};

// Delete experience
export const deleteEducation = (eduId) => (dispatch) => {
  if (window.confirm("Are  you sure? This can NOT be undone!")) {
    axios
      .delete(`/api/profile/education/${eduId}`)
      .then((res) =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        })
      )
      .catch((errDelete) =>
        dispatch({
          type: GET_DELETE_ERRORS,
          payload: errDelete.response.data,
        })
      );
  }
};

//Get profiles
export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then((res) =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILES,
        payload: {},
      })
    );
};

// Get profile by handle
export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: null,
      })
    );
};
