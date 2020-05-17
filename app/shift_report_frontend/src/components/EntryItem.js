import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

export default function EntryItem(props) {
  const [editMode, setEditMode] = useState(false);
  let editItem = editMode ? (
    <TextField
      onBlur={() => setEditMode(!editMode)}
      id="standard-full-width"
      style={{ margin: 8 }}
      defaultValue={props.item.body}
      fullWidth
      margin="normal"
      autoFocus
    />
  ) : (
    <div
      onClick={() => {
        setEditMode(!editMode);
      }}
      className="entry-item"
    >
      {props.item.time}
      <span style={{ marginLeft: "2em" }}></span>
      {props.item.body}
    </div>
  );
  return <div>{editItem}</div>;
}
