import React from "react";

import Paper from "@material-ui/core/Paper";

export default function CustomPaper(props) {
  return <Paper className="custom-paper">{props.children}</Paper>;
}
