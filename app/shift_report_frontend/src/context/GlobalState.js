import React, { useContext, useState, useReducer } from "react";
import Api from "../api/Api";
import axios from "axios";
import AppContext from "./app-context";
import {
  userReducer,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  CREATE_NEW_USER,
  reportReducer,
  SET_REPORT,
  entryReducer,
  SET_ENTRIES,
} from "./reducers";

const API_URL = "http://localhost:3000";

export default function GlobalState(props) {
  const context = useContext(AppContext);
  console.log(context.currentReport);
  const [reportState, reportDispatch] = useReducer(
    reportReducer,
    context.currentReport
  );
  const [entryState, entryDispatch] = useReducer(
    entryReducer,
    context.currentEntries
  );
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
          const { fname, lname, dpsst, email, id } = res.data;
          console.log(res);
          window.localStorage.csrf = res.data.csrf;
          window.localStorage.signedIn = true;
          window.localStorage.setItem(
            "currentUser",
            JSON.stringify({ fname, lname, dpsst, email, id })
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
          const { fname, lname, dpsst, email, id } = res.data;
          console.log(res.data);
          window.localStorage.csrf = res.data.csrf;
          window.localStorage.signedIn = true;
          window.localStorage.setItem(
            "currentUser",
            JSON.stringify({ fname, lname, dpsst, email, id })
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
  const startReport = (history) => {
    //* start a report: send api call, return id, navigate to report page to add entries
    const reportDetails = {
      user_id: window.localStorage.currentUser.id,
      title: "test report",
    };
    return new Promise((resolve, reject) => {
      let paramId;
      Api()
        .post(`${API_URL}/api/v1/reports`, reportDetails)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    })
      .then((res) => {
        history.push(`/report/${res.data.id}`);
        // const reportId = res.data.id;
        // history.push(`/report/${reportId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getReport = (reportId) => {
    return new Promise((resolve, reject) => {
      Api()
        .get(`${API_URL}/api/v1/reports/${reportId}`)
        .then((res) => {
          reportDispatch({ type: SET_REPORT, payload: res.data });
          resolve(res.data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    })
      .then((res) => {
        console.log(res);
        // const reportId = res.data.id;
        // history.push(`/report/${reportId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeEntry = (history, entryDetails) => {
    //* send an entry belonging to a report
  };

  const getEntries = () => {
    //* retrieve all entries belonging to a report
  };

  const generateDocx = (history) => {
    //* generate a document with the bolonging entries, save doc to db?, then return the doc as an attachement
  };

  return (
    <AppContext.Provider
      value={{
        currentUser: userState.currentUser,
        signin: signin,
        logout: logout,
        register: register,
        checkSignedIn: checkSignedIn,
        currentReport: reportState.currentReport,
        startReport: startReport,
        getReport: getReport,
        currentEntries: entryState.currentEntries,
        makeEntry: makeEntry,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
