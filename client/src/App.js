import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Error404 from "./components/layout/Error404";
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken.js";
import {
  logoutCurrentUser,
  setCurrentUser,
} from "./redux/actions/authAction.js";
import { clearCurrentProfile } from "./redux/actions/profileAction";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  const userToken = localStorage.jwtToken;
  //Set auth token header off
  setAuthToken(userToken);
  //Decode token and get user info
  const decoded = jwt_decode(userToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutCurrentUser());
    //Clear current profile
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href("/login");
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="*" component={Error404} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
