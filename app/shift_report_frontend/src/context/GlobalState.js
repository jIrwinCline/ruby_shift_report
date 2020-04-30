import React, { useState } from "react";

import UserContext from "./user-context";
import { userReducer, SET_CURRENT_USER, REMOVE_CURRENT_USER } from "./reducers";
export default function GlobalState(props) {
  //   const [currentUser, setCurrentUser] = useState({
  //     email: null,
  //     fname: null,
  //     lname: null,
  //     dpsst: null,
  //     test: "test",
  //   });
  const [userState, dispatch] = useReducer(userReducer);
  const [reports, setReports] = useState({
    reports: [],
  });

  const signin = () => {
    //will call dispatch here
    // dispatch({})
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
