import React from "react";
import UserContext from "../context/user-context";

export default function CurrentUserPage(props) {
  return (
    <UserContext.Consumer>
      {(context) => (
        <React.Fragment>
          <button onClick={context.signin}>Sign in</button>
          <button onClick={context.logout}>Logout</button>
          <div>Hello {context.test}</div>
        </React.Fragment>
      )}
    </UserContext.Consumer>
  );
}
