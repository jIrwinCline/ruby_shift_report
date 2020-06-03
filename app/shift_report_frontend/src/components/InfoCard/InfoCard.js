import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/app-context";
import { useHistory } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import CustomPaper from "../CustomPaper/CustomPaper";
import TitleText from "../TitleText/TitleText";
import BodyText from "../BodyText/BodyText";
import Drawer from "../Drawer";
import CustomLink from "../CustomLink/CustomLink";

import colors from "../../assets/constants/Contants";

const useStyles = makeStyles((theme) => ({
  field: {
    width: 100,
    display: "inline",
  },
  saveBtn: {
    float: "right",
    marginTop: 10,
  },
}));

export default function InfoCard() {
  const context = useContext(AppContext);
  const history = useHistory();
  const [editMode, setEditMode] = useState(false);
  const classes = useStyles();

  let editFields = editMode ? (
    <div>
      <div className="edit-line-container" style={{ backgroundColor: "white" }}>
        <BodyText style={{ display: "inline" }}>
          <strong>Name: </strong>
        </BodyText>
        <TextField
          id="standard-full-width"
          style={{ margin: 8, width: "200px" }}
          defaultValue={`${context.currentUser.fname} ${context.currentUser.lname}`}
          margin="normal"
        />
      </div>
      <div className="edit-line-container" style={{ backgroundColor: "white" }}>
        <BodyText style={{ display: "inline" }}>
          <strong>Email: </strong>
        </BodyText>
        <TextField
          id="standard-full-width"
          style={{ margin: 8, width: "200px" }}
          defaultValue={context.currentUser.email}
          margin="normal"
        />
      </div>
      <div className="edit-line-container" style={{ backgroundColor: "white" }}>
        <BodyText style={{ display: "inline" }}>
          <strong>DPSST: </strong>
        </BodyText>
        <TextField
          id="standard-full-width"
          style={{ margin: 8, width: "200px" }}
          defaultValue={context.currentUser.dpsst}
          margin="normal"
        />
      </div>
      <Button className={classes.saveBtn}>Save</Button>
    </div>
  ) : (
    <div>
      <div className="line-container" style={{ backgroundColor: "white" }}>
        <BodyText>
          <strong>Name: </strong>
          {context.currentUser.fname} {context.currentUser.lname}
        </BodyText>
      </div>
      <div className="line-container" style={{ backgroundColor: "white" }}>
        <BodyText>
          <strong>Email: </strong>

          {context.currentUser.email}
        </BodyText>
      </div>
      <div className="line-container" style={{ backgroundColor: "white" }}>
        <BodyText>
          <strong>DPSST: </strong>
          {context.currentUser.dpsst}
        </BodyText>
      </div>
    </div>
  );

  return (
    <div>
      <CustomPaper style={{ height: "125%" }}>
        <Grid container>
          <Grid item xs={12}>
            <TitleText
              style={{
                fontSize: "24px",
                // width: "60%",
                display: "inline-block",
                marginBottom: -8,
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
              onClick={() => setEditMode(!editMode)}
            >
              edit
            </CustomLink>
            <hr style={{ border: "solid 1px #cecece", marginBottom: 20 }} />
            {editFields}
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="side-blurb">
              {/* <BookmarkIcon />{" "} */}
              <svg
                width="20"
                height="30"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0"
                  y="5"
                  width="8"
                  height="30"
                  // stroke="#5bb563"
                  fill="#5bb563"
                  stroke-width="5"
                />
              </svg>
              <TitleText style={{ fontSize: 19 }}>ON YOUR REPORT</TitleText>
              <br />
              <BodyText style={{ lineHeight: 1.75 }}>
                This is your officer information you've provided us. This is
                what will appear at the top of each report.
              </BodyText>
            </div>
          </Grid>
        </Grid>
      </CustomPaper>
      <br />
      <CustomPaper style={{ height: "125%" }}>
        <Grid container>
          <Grid item xs={12}>
            <TitleText
              style={{
                fontSize: "24px",
                // width: "60%",
                display: "inline-block",
                marginBottom: -8,
              }}
            >
              Report Stats
            </TitleText>
          </Grid>
          <Grid item xs={12} md={8}>
            {/* <CustomLink
              style={{
                fontSize: 18,
                width: 30,
                left: 10,
                float: "right",
                marginRight: 10,
                position: "relative",
                bottom: 9,
              }}
              onClick={() => setEditMode(!editMode)}
            >
              edit
            </CustomLink> */}
            <hr style={{ border: "solid 1px #cecece", marginBottom: 20 }} />
            <div>
              <div
                className="line-container"
                style={{ backgroundColor: "white" }}
              >
                <BodyText>
                  <strong>Reports Created: </strong>
                  {/* {context.currentUser.fname} {context.currentUser.lname} */}
                </BodyText>
              </div>
              <div
                className="line-container"
                style={{ backgroundColor: "white" }}
              >
                <BodyText>
                  <strong>Entries Made: </strong>

                  {/* {context.currentUser.email} */}
                </BodyText>
              </div>
              <div
                className="line-container"
                style={{ backgroundColor: "white" }}
              >
                <BodyText>
                  <strong>Average Entries per Report: </strong>
                  {/* {context.currentUser.dpsst} */}
                </BodyText>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="side-blurb">
              {/* <BookmarkIcon />{" "} */}
              <svg
                width="20"
                height="30"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0"
                  y="5"
                  width="8"
                  height="30"
                  // stroke="#5bb563"
                  fill="#5bb563"
                  stroke-width="5"
                />
              </svg>
              <TitleText style={{ fontSize: 19 }}>THE NUMBERS</TitleText>
              <br />
              <BodyText style={{ lineHeight: 1.75 }}>
                These are indicators of your report writing stats up to the
                current day.
              </BodyText>
            </div>
          </Grid>
        </Grid>
      </CustomPaper>
    </div>
  );
}
