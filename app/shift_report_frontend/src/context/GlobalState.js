import React, { useState, useReducer } from "react";
import Api from "../api/Api";
import axios from "axios";
import UserContext from "./user-context";
import {
  userReducer,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  CREATE_NEW_USER,
} from "./reducers";

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
  const checkSignedIn = () => {
    if (localStorage.signedIn) {
      return true;
    } else {
      return false;
    }
  };

  const signin = (credentials) => {
    //make api post call, if status 200, dispatch reducer with the user Details
    //if error status, dispatch errors***
    return new Promise((resolve, reject) => {
      Api()
        .post(`${API_URL}/signin`, credentials)
        .then((res) => {
          console.log(res);
          localStorage.csrf = res.data.csrf;
          localStorage.signedIn = true;
          dispatch({
            type: SET_CURRENT_USER,
            payload: res.data,
          });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          delete localStorage.csrf;
          delete localStorage.signedIn;
        });
    });
  };
  const logout = () => {
    //make api delete call, if status 200, update state with blank current user details
    console.log(axios.defaults);
    Api()
      .delete(`${API_URL}/signin`)
      .then((res) => {
        delete localStorage.csrf;
        delete localStorage.signedIn;
        dispatch({
          type: CLEAR_CURRENT_USER,
        }).catch((err) => {
          console.error(err);
        });
      });
  };
  const register = (userDetails) => {
    return new Promise((resolve, reject) => {
      Api()
        .post(`${API_URL}/signup`, userDetails)
        .then((res) => {
          console.log(res.data);
          localStorage.csrf = res.data.csrf;
          localStorage.signedIn = true;
          dispatch({
            type: SET_CURRENT_USER,
            payload: res.data,
          });
          resolve(res);
        })
        .catch((err) => {
          delete localStorage.csrf;
          delete localStorage.signedIn;
          console.log(err);
          reject(err);
        });
    });
  };

  //Reports
  const startReport = (history, userDetails) => {
    //* start the word doc
    history.push("/reports");
  };

  return (
    <UserContext.Provider
      value={{
        currentUser: userState.currentUser,
        reports,
        signin: signin,
        logout: logout,
        register: register,
        checkSignedIn: checkSignedIn,
        startReport: startReport,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
