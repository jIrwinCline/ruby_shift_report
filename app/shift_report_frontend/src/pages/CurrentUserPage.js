import React, { useContext, useEffect } from "react";
import UserContext from "../context/user-context";
import { useHistory } from "react-router-dom";

export default function CurrentUserPage(props) {
  const context = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    console.log(context);
    if (!window.localStorage.signedIn) {
      history.push("/login");
    }
  }, []);

  return (
    <React.Fragment>
      <button onClick={() => context.logout(history)}>Logout</button>
      <div>
        <p>Hello {context.currentUser.email}</p>
        <p> {context.currentUser.fname}</p>
        <p> {context.currentUser.dpsst}</p>
      </div>
      <button
        onClick={() => {
          context.startReport(history, context.currentUser);
        }}
      >
        Create Report
      </button>
    </React.Fragment>
  );
}
