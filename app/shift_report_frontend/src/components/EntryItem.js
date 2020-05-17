import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import AppContext from "../context/app-context";
import { withRouter } from "react-router-dom";

function EntryItem(props) {
  const context = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [newEntry, setNewEntry] = useState(null);
  const [entryId, setEntryId] = useState(null);
  // let inputEnter = document.getElementById("new-body");
  // inputEnter.onkeyup =
  let editItem = editMode ? (
    <TextField
      onKeyUp={(e) => {
        if (e.keyCode == 13) {
          const reportId = props.match.params.id;
          context.editEntry(entryId, reportId, newEntry);
          e.target.blur();
        }
      }}
      onChange={(e) => {
        setNewEntry({ ...props.item, body: e.target.value });
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
        setEntryId(props.item.id);
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

export default withRouter(EntryItem);
