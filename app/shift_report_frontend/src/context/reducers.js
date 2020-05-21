export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER";
export const SET_REPORT = "SET_REPORT";
export const SET_ENTRIES = "SET_ENTRIES";

const signin = (userDetails, state) => {
  const { email, fname, lname, dpsst, id } = userDetails;
  let userState = state.currentUser;
  userState = { email, fname, lname, dpsst, id };
  //mutates the state and returns it to the Switch case
  return { ...state, currentUser: userState };
};
const logout = (state) => {
  //mutates the state and returns it to the Switch case
  return {
    ...state,
    currentUser: {
      email: null,
      fname: null,
      lname: null,
      dpsst: null,
      id: null,
    },
  };
};
const getReport = (reportDetails, state) => {
  const { id, user_id, title, body } = reportDetails;
  return {
    ...state,
    currentReport: { id, user_id, title, body },
  };
};

const getEntries = (entries, state) => {
  return {
    ...state,
    currentEntries: entries,
  };
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return signin(action.payload, state);
    case CLEAR_CURRENT_USER:
      return logout(state);
    default:
      return state;
  }
};

export const reportReducer = (state, action) => {
  switch (action.type) {
    case SET_REPORT:
      return getReport(action.payload, state);
    default:
      return state;
  }
};

export const entryReducer = (state, action) => {
  switch (action.type) {
    case SET_ENTRIES:
      return getEntries(action.payload, state);
    default:
      return state;
  }
};
