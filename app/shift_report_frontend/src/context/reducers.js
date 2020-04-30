export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER";

const signin = (userDetails, state) => {
  //do something
  const { email, fname, lname, dpsst } = userDetails;
  let userState = state.currentUser;
  userState = { email, fname, lname, dpsst };
  //make api post call, if status 200, update state with current user details
  console.log({ ...state, currentUser: userState });
  return { ...state, currentUser: userState };
};
const logout = (state) => {
  console.log("signed out");
  return {
    ...state,
    currentUser: { email: null, fname: null, lname: null, dpsst: null },
  };
  //make api delete call, if status 200, update state with blank current user details
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
