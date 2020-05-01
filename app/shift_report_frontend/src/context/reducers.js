export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER";
export const CREATE_NEW_USER = "CREATE_NEW_USER";

const signin = (userDetails, state) => {
  const { email, fname, lname, dpsst } = userDetails;
  let userState = state.currentUser;
  userState = { email, fname, lname, dpsst };
  //mutates the state and returns it to the Switch case
  console.log({ ...state, currentUser: userState });
  return { ...state, currentUser: userState };
};
const logout = (state) => {
  //mutates the state and returns it to the Switch case
  return {
    ...state,
    currentUser: { email: null, fname: null, lname: null, dpsst: null },
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
