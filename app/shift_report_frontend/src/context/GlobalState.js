import React, { useState, useReducer } from "react";

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
  const [userState, dispatch] = useReducer(userReducer, { user: null });
  const [reports, setReports] = useState({
    reports: [],
  });

  const signin = (credentials) => {
    const { password, email } = credentials;
    //make api post call, if status 200, dispatch reducer with the user Details
    //if error status, dispatch errors

    //will call dispatch here
    dispatch({
      type: SET_CURRENT_USER,
      payload: credentials /**will be user details */,
    });
    console.log("signed in");
  };
  const logout = () => {
    console.log("signed out");
  };

  return (
    <UserContext.Provider
      value={{
        currentUser: userState,
        reports,
        signin: signin,
        logout: logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
