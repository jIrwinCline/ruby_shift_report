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

import reportImage from "../assets/img/report.jpg";
import guyImage from "../assets/img/guy.png";
import guardImage from "../assets/img/guard.png";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import SchoolIcon from "@material-ui/icons/School";

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
            {context.currentUser ? <InfoCard /> : null}
          </Grid>
          <Grid item xs={0} lg={3}>
            <div className="block-right">
              <TitleText style={{ fontSize: 24 }}>
                Perform, Report, and Automate
              </TitleText>
              <img src={guardImage} alt="guard graphic" />
              <ArrowDropDownIcon fontSize="large" />
              <img src={guyImage} alt="guy graphic" />
              <ArrowDropDownIcon fontSize="large" />
              <img
                className="report-graphic"
                src={reportImage}
                alt="report graphic"
              />
            </div>
          </Grid>
          {/* <Grid className="bottom-options" item xs={12}>
            <CustomPaper style={{ height: 200, border: "1px solid grey" }}>
              <Grid container>
                <Grid item xs={12}>
                  <TitleText
                    style={{
                      fontSize: "24px",
                      // width: "60%",
                      display: "inline-block",
                      marginBottom: -8,
                      margin: "-2% 0 0 50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    Data/Account Options
                  </TitleText>
                </Grid>
                <Grid item xs={12}>
                  <div className="options-container">
                    <DeleteSweepIcon />
                    <RemoveCircleIcon />
                    <SchoolIcon />
                  </div>
                </Grid>
              </Grid>
            </CustomPaper>
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
}
