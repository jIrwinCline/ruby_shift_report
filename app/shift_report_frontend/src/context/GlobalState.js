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
  // const currentUser = JSON.parse("{ 'hi': 'hi' }");
  console.log(window.localStorage.currentUser);
  const [userState, dispatch] = useReducer(userReducer, {
    currentUser: JSON.parse(window.localStorage.getItem("currentUser")),
  });
  const [reports, setReports] = useState({
    reports: [],
  });
  const checkSignedIn = () => {
    if (window.localStorage.signedIn) {
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
          const { fname, lname, dpsst, email } = res.data;
          console.log(res);
          window.localStorage.csrf = res.data.csrf;
          window.localStorage.signedIn = true;
          window.localStorage.setItem(
            "currentUser",
            JSON.stringify({ fname, lname, dpsst, email })
          );

          dispatch({
            type: SET_CURRENT_USER,
            payload: res.data,
          });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          delete window.localStorage.csrf;
          delete window.localStorage.signedIn;
          // delete window.localStorage.currentUser;
        });
    });
  };
  const logout = (history) => {
    //make api delete call, if status 200, update state with blank current user details
    console.log(axios.defaults);
    Api()
      .delete(`${API_URL}/signin`)
      .then((res) => {
        delete window.localStorage.csrf;
        delete window.localStorage.signedIn;
        delete window.localStorage.currentUser;
        dispatch({
          type: CLEAR_CURRENT_USER,
        });
        history.replace("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const register = (userDetails) => {
    return new Promise((resolve, reject) => {
      Api()
        .post(`${API_URL}/signup`, userDetails)
        .then((res) => {
          const { fname, lname, dpsst, email } = res.data;
          console.log(res.data);
          window.localStorage.csrf = res.data.csrf;
          window.localStorage.signedIn = true;
          window.localStorage.setItem(
            "currentUser",
            JSON.stringify({ fname, lname, dpsst, email })
          );
          dispatch({
            type: SET_CURRENT_USER,
            payload: res.data,
          });
          resolve(res);
        })
        .catch((err) => {
          delete window.localStorage.csrf;
          delete window.localStorage.signedIn;
          // delete window.localStorage.currentUser;
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
