import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReportsPage from "./pages/ReportsPage";
import ReportPage from "./pages/ReportPage";
import CurrentUserPage from "./pages/CurrentUserPage";

import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

import GlobalState from "./context/GlobalState";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const items = [
  { name: "home", label: "Home" },
  { name: "billing", label: "Billing" },
  { name: "settings", label: "Settings" },
];

function App(props) {
  const classes = useStyles();

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
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Shift Report
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </div>
      {/* <Container maxWidth="lg"> */}
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
