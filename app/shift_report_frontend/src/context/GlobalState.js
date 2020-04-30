import React, { useState } from "react";

import UserContext from "./user-context";

export default function GlobalState(props) {
  const [currentUser, setCurrentUser] = useState({
    email: null,
    fname: null,
    lname: null,
    dpsst: null,
    test: "test",
  });
  const [reports, setReports] = useState({
    reports: [],
  });

  const signin = () => {
    console.log("signed in");
  };
  const logout = () => {
    console.log("signed out");
  };
  return (
    <UserContext.Provider
      value={{
        currentUser,
        reports,
        signin: () => signin(),
        logout: () => logout(),
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
