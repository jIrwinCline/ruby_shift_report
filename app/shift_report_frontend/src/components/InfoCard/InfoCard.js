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
    <CustomPaper>
      <Grid container>
        <Grid item xs={12}>
          <TitleText
            style={{
              fontSize: "24px",
              width: "50%",
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
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </CustomPaper>
  );
}
