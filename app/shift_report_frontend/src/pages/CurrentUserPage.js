import React from "react";
import UserContext from "../context/user-context";

export default function CurrentUserPage(props) {
  return (
    <UserContext.Consumer>
      {(context) => <div>Hello {context.test}</div>}
    </UserContext.Consumer>
  );
}
