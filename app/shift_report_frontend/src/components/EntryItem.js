import React from "react";

export default function EntryItem(props) {
  return (
    <div className="entry-item">
      {props.item.time}
      <span style={{ marginLeft: "2em" }}></span>
      {props.item.body}
    </div>
  );
}
