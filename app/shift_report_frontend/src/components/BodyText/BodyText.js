import React from "react";

export default function CustomText(props) {
  return (
    <p className="body-text" style={{ ...props.style }}>
      {props.children}
    </p>
  );
}
