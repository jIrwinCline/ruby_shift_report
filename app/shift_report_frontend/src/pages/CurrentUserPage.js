import React, { useContext, useEffect } from "react";
import UserContext from "../context/user-context";

export default function CurrentUserPage(props) {
  const context = useContext(UserContext);

  useEffect(() => {
    console.log(context);
  }, []);

  return (
    <React.Fragment>
      <button onClick={context.signin}>Sign in</button>
      <button onClick={context.logout}>Logout</button>
      <div>Hello {context.currentUser.test}</div>
    </React.Fragment>
  );
}
