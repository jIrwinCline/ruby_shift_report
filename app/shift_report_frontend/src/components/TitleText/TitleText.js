import React from "react";

export default function TitleText(props) {
  return (
    <p className="title-text" style={{ ...props.style }}>
      {props.children}
    </p>
  );
}
