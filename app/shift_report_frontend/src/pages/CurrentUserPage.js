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
            <CustomPaper>
              <Grid container>
                <Grid item xs={12}>
                  <TitleText
                    style={{
                      fontSize: "24px",
                      width: "50%",
                      display: "inline-block",
                      marginBottom: -8,
                      // fontWeight: "bold",
                    }}
                  >
                    User Details
                  </TitleText>
                </Grid>
                <Grid item xs={12} md={8}>
                  <CustomLink
                    style={{
                      fontSize: 18,
                      width: 30,
                      left: 10,
                      float: "right",
                      marginRight: 10,
                      position: "relative",
                      bottom: 9,
                    }}
                  >
                    edit
                  </CustomLink>
                  <hr style={{ border: "solid 1px #cecece" }} />
                  <div
                    className="line-container"
                    style={{ backgroundColor: "white" }}
                  >
                    <BodyText>
                      <strong>Name: </strong>
                      {context.currentUser.fname} {context.currentUser.lname}
                    </BodyText>
                  </div>
                  <div
                    className="line-container"
                    style={{ backgroundColor: "white" }}
                  >
                    <BodyText>
                      <strong>Email: </strong>
                      {context.currentUser.email}
                    </BodyText>
                  </div>
                  <div
                    className="line-container"
                    style={{ backgroundColor: "white" }}
                  >
                    <BodyText>
                      <strong>DPSST: </strong>
                      {context.currentUser.dpsst}
                    </BodyText>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}></Grid>
              </Grid>
            </CustomPaper>
          </Grid>
          <Grid item xs={12} lg={3}>
            <button
              onClick={() => {
                context.startReport(context.currentUser);
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
