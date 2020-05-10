import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
//Components
import Appbar from "./components/Appbar";
import Sidebar from "./components/Sidebar";
//Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReportsPage from "./pages/ReportsPage";
import ReportPage from "./pages/ReportPage";
import CurrentUserPage from "./pages/CurrentUserPage";
//MUI
import Container from "@material-ui/core/Container";
import GlobalState from "./context/GlobalState";

const items = [
  { name: "home", label: "Home" },
  { name: "billing", label: "Billing" },
  { name: "settings", label: "Settings" },
];

function App(props) {
  const SidebarRoutes = (props) => (
    <div className="body-container">
      <Sidebar items={items} />

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
      <Appbar />
      <Router>
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
