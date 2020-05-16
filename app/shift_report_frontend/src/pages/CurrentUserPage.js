import React, { useContext, useEffect } from "react";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CustomPaper from "../components/CustomPaper/CustomPaper";
import TitleText from "../components/TitleText/TitleText";
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
        <TitleText>Dashboard</TitleText>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <CustomPaper>
              <p>Hello {context.currentUser.email}</p>
              <p> {context.currentUser.fname}</p>
              <p> {context.currentUser.dpsst}</p>
            </CustomPaper>
          </Grid>
          <Grid item xs={3}>
            <button
              onClick={() => {
                context.startReport(history, context.currentUser);
              }}
            >
              Create Report
            </button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
