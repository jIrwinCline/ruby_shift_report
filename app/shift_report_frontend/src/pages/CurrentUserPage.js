import React, { useContext, useEffect } from "react";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";

export default function CurrentUserPage(props) {
  const context = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (!window.localStorage.signedIn) {
      history.push("/login");
    }
  }, []);

  return (
    <div className="user-page-container">
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
    </div>
  );
}
