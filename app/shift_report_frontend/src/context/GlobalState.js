import React, { useState, useReducer } from "react";
import Api from "../api/Api";

import UserContext from "./user-context";
import { userReducer, SET_CURRENT_USER, CLEAR_CURRENT_USER } from "./reducers";

const API_URL = "http://localhost:3000";

export default function GlobalState(props) {
  //   const [currentUser, setCurrentUser] = useState({
  //     email: null,
  //     fname: null,
  //     lname: null,
  //     dpsst: null,
  //     test: "test",
  //   });
  const [userState, dispatch] = useReducer(userReducer, {
    currentUser: { email: null },
  });
  const [reports, setReports] = useState({
    reports: [],
  });

  const signin = (credentials) => {
    const { password, email } = credentials;
    //make api post call, if status 200, dispatch reducer with the user Details
    //if error status, dispatch errors
    Api()
      .post(`${API_URL}/signin`, credentials)
      .then((res) => {
        console.log(res.data);
      });

    //will call dispatch here
    dispatch({
      type: SET_CURRENT_USER,
      payload: credentials /**will be user details */,
    });
    console.log(userState);
  };
  const logout = () => {
    //make api delete call, if status 200, update state with blank current user details
    dispatch({
      type: CLEAR_CURRENT_USER,
    });
  };

  return (
    <UserContext.Provider
      value={{
        currentUser: userState.currentUser,
        reports,
        signin: signin,
        logout: logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
