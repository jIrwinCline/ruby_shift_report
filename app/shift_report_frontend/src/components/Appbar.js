import React, { useContext, useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";

import Logo from "../assets/img/logo2.png";

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

export default function Appbar() {
  const classes = useStyles();
  const context = useContext(AppContext);
  const history = useHistory();

  let logoutBtn = window.localStorage.signedIn ? (
    <Button onClick={() => context.logout()} color="inherit">
      Logout
    </Button>
  ) : null;

  return (
    <div className={classes.root}>
      <AppBar className="app-bar" position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img className="app-bar-logo" src={Logo} alt="Shift report logo" />
          </Typography>
          {logoutBtn}
        </Toolbar>
      </AppBar>
    </div>
  );
}
