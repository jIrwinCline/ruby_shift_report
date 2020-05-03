import React from "react";

export default React.createContext({
  currentUser: {
    fname: null,
    lname: null,
    dpsst: null,
    email: null,
  },
  report: {
    id: null,
    user_id: null,
    title: null,
    body: null,
  },
});
