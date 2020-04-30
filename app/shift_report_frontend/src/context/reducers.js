export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";

const signin = (email, password, user) => {
  //do something
  console.log("signed in");
};
const logout = () => {
  console.log("signed out");
};

export default userReducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return signin(action.email, action.password, state.user);
    case REMOVE_CURRENT_USER:
      return;
    default:
      return state;
  }
};
