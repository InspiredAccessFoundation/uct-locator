import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import SubmitTable from "./components/Tables/SubmitTable";
import LocationViewMap from "./components/Map/LocationViewMap";
import ViewTable from "./components/Tables/ViewTable";

import Container from '@mui/material/Container';

import "./App.css";
import SubmitPicture from "./components/Pictures/SubmitPicture";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Container>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/find" component={LocationViewMap} />
            <Route path="/view-table/:tableId" component={ViewTable} />
            <Route path="/submit-picture/:tableId" component={SubmitPicture} />
            <Switch>
              <PrivateRoute exact path="/submit-table" component={SubmitTable} />
            </Switch>
            <div style={{ height: "50px" }} />
          </Container>
        </Router>
      </Provider>
    );
  }
}
export default App;
