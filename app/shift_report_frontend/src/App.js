import React, { createContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReportsPage from "./pages/ReportsPage";
import CreateReportPage from "./pages/CreateReportPage";
import CurrentUserPage from "./pages/CurrentUserPage";

import UserContext from "./context/user-context";

const initialState = {
  user: null,
  reports: [],
  test: "Teststate",
};

const signin = () => {
  console.log("signed in");
};
const logout = () => {
  console.log("signed out");
};
function App() {
  return (
    <UserContext.Provider
      value={{
        ...initialState,
        signin: signin(),
        logout: logout(),
      }}
    >
      return (
      <Router>
        <Switch>
          <Route exact path="/" component={CurrentUserPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/reports" component={ReportsPage} />
          <Route exact path="/report/entries" component={CreateReportPage} />
        </Switch>
      </Router>
      );
    </UserContext.Provider>
  );
}

export default App;
