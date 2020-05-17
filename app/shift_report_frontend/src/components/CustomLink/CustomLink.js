import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    background: "none",
    border: "none",
    padding: 0,
    color: "#069",
    cursor: "pointer",
    fontSize: 18,
    // width: 30,
    position: "relative",
    "&:hover": {
      color: "lightgreen",
    },
  },
}));

export default function CustomLink(props) {
  const classes = useStyles();
  return (
    <a style={props.style} onClick={props.onClick} className={classes.button}>
      {props.children}
    </a>
  );
}
