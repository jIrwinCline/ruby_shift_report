export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";

const signin = (userDetails, state) => {
  //do something
  console.log("signing in");
  const { email, fname, lname, dpsst } = userDetails;
  let userState = state.user;
  //make api post call, if status 200, update state with current user details
  return { ...state, user: userState };
};
const logout = () => {
  console.log("signed out");
  //make api delete call, if status 200, update state with blank current user details
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return signin(action.payload, state);
    case REMOVE_CURRENT_USER:
      return;
    default:
      return state;
  }
};
