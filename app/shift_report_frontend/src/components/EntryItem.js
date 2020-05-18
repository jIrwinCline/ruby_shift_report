import React, { useState, useContext, Fragment } from "react";
import AppContext from "../context/app-context";
import { withRouter } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

function EntryItem(props) {
  const context = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [newEntry, setNewEntry] = useState(null);
  const [entryId, setEntryId] = useState(null);
  // let inputEnter = document.getElementById("new-body");
  // inputEnter.onkeyup =
  const handleBlur = (e) => {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setEditMode(!editMode);
      }
    }, 0);
  };
  let editItem = editMode ? (
    <div onBlur={(e) => handleBlur(e)}>
      <div style={{ margin: "4px 0px 0px 8px" }}>{props.item.time}</div>
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
        id="new-body"
        style={{
          marginTop: 8,
          marginBottom: 8,
          position: "relative",
          zIndex: 0,
          overflow: "hidden",
        }}
        defaultValue={props.item.body}
        fullWidth
        margin="normal"
        autoFocus
      ></TextField>
      <div
        style={{
          backgroundColor: "white",
          // border: "solid 1px",
          // height: 100,
          width: 100,
          position: "relative",
          zIndex: 100,
          marginTop: -50,
          marginLeft: 15,
          float: "right",
          textAlign: "center",
        }}
      >
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={() => {
            // debugger;
            context.deleteEntry(props.match.params.id, props.item.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
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
