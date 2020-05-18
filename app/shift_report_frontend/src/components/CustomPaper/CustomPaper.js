import React from "react";

import Paper from "@material-ui/core/Paper";

export default function CustomPaper(props) {
  return (
    <Paper elevation={0} className="custom-paper">
      {props.children}
    </Paper>
  );
}
