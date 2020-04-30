import React from "react";

import UserContext from "./user-context";

export default function GlobalState(props) {
  const initialState = {
    user: null,
    reports: [],
    test: "Teststate",
  };

  const signin = () => {
    console.log("signed in");
  };
  const logout = () => {
    console.log("signed out");
  };
  return (
    <UserContext.Provider
      value={{
        ...initialState,
        signin: () => signin(),
        logout: () => logout(),
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
