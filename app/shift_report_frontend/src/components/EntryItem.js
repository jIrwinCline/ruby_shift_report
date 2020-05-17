import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

export default function EntryItem(props) {
  const [editMode, setEditMode] = useState(false);
  const [newBody, setNewBody] = useState(null);
  let inputEnter = document.getElementById("new-body");
  // inputEnter.onkeyup =
  let editItem = editMode ? (
    <TextField
      onKeyUp={(e) => {
        if (e.keyCode == 13) {
          alert(newBody);
        }
      }}
      onChange={(e) => {
        setNewBody(e.target.value);
      }}
      onBlur={() => setEditMode(!editMode)}
      id="new-body"
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
