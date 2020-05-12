import React, { useContext, useEffect } from "react";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Drawer from "../components/Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function CurrentUserPage(props) {
  const context = useContext(AppContext);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (!window.localStorage.signedIn) {
      history.push("/login");
    }
  }, []);

  return (
    <div className="user-page-container">
      <Drawer />
      <div className={classes.content}>
        <button onClick={() => context.logout(history)}>Logout</button>
        <div>
          <p>Hello {context.currentUser.email}</p>
          <p> {context.currentUser.fname}</p>
          <p> {context.currentUser.dpsst}</p>
        </div>
        <button
          onClick={() => {
            context.startReport(history, context.currentUser);
          }}
        >
          Create Report
        </button>
      </div>
    </div>
  );
}
