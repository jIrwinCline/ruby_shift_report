import React, { useContext, useState } from "react";

import IdleTimer from "react-idle-timer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";

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
  const [idleTimer, setIdleTimer] = useState(null);

  const onAction = (e) => {
    console.log("user did something", e);
  };

  const onActive = (e) => {
    console.log("user is active", e);
    console.log("time remaining", idleTimer.getRemainingTime());
  };

  const onIdle = (e) => {
    context.logout(history);
  };

  return (
    <div className={classes.root}>
      <IdleTimer
        ref={(ref) => {
          setIdleTimer(ref);
        }}
        element={document}
        onActive={onActive}
        onIdle={onIdle}
        onAction={onAction}
        debounce={250}
        timeout={20 * 60 * 1000}
      />
      <AppBar className="app-bar" position="fixed">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Shift Report
          </Typography>
          <Button onClick={() => context.logout(history)} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
