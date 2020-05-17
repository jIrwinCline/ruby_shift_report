import React, { useContext, useEffect } from "react";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CustomPaper from "../components/CustomPaper/CustomPaper";
import TitleText from "../components/TitleText/TitleText";
import BodyText from "../components/BodyText/BodyText";
import Drawer from "../components/Drawer";
import CustomLink from "../components/CustomLink/CustomLink";

import InfoCard from "../components/InfoCard/InfoCard";

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
          <Grid item xs={12} lg={9}>
            <InfoCard />
          </Grid>
          <Grid item xs={12} lg={3}></Grid>
        </Grid>
      </div>
    </div>
  );
}
