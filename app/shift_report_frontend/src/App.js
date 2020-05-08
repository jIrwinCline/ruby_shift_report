import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReportsPage from "./pages/ReportsPage";
import ReportPage from "./pages/ReportPage";
import CurrentUserPage from "./pages/CurrentUserPage";

import Container from "@material-ui/core/Container";

import GlobalState from "./context/GlobalState";

function App(props) {
  return (
    <GlobalState>
      <Container maxWidth="sm">
        <Router>
          <Switch>
            <Route exact path="/" component={CurrentUserPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/reports" component={ReportsPage} />
            <Route exact path="/report/:id" component={ReportPage} />
          </Switch>
        </Router>
      </Container>
    </GlobalState>
  );
}

export default App;
