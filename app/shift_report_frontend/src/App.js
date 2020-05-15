import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
//Components
import Appbar from "./components/Appbar";
import Drawer from "./components/Drawer";
//Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReportsPage from "./pages/ReportsPage";
import ReportPage from "./pages/ReportPage";
import CurrentUserPage from "./pages/CurrentUserPage";
//MUI
import Container from "@material-ui/core/Container";
import GlobalState from "./context/GlobalState";

function App(props) {
  const SidebarRoutes = (props) => (
    <div className="flex">
      <Drawer />

      <div className="content-container">
        <Switch>
          <Route exact path="/reports" component={ReportsPage} />
          <Route exact path="/report/:id" component={ReportPage} />
        </Switch>
      </div>
    </div>
  );

  return (
    <GlobalState>
      <Router>
        <Appbar />
        <Switch>
          <Route exact path="/" component={CurrentUserPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route component={SidebarRoutes} />
        </Switch>
      </Router>
      {/* </Container> */}
    </GlobalState>
  );
}

export default App;
