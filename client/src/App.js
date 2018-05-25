import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authAction";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store/store";
import { logoutUser } from "./actions/authAction";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Landing from "./components/layouts/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashbord from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";

//Check for Token
if (localStorage.jwtToken) {
  //Set auth token header authAction
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //LOGOUT USER WHEN TOKEN EXPIRES
  //check for expired Token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //LOGOUT THE USER
    store.dispatch(logoutUser());
    // TODO: //clear current profile
    store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashbord} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
