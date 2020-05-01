import React, { useContext, useEffect } from "react";
import UserContext from "../context/user-context";
import { useHistory } from "react-router-dom";

export default function CurrentUserPage(props) {
  const context = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    console.log(context);
    if (localStorage.signedIn == "false") {
      history.push("/login");
    }
  }, []);

  return (
    <React.Fragment>
      <button onClick={() => context.logout()}>Logout</button>
      <div>
        <p>Hello {context.currentUser.email}</p>
      </div>
    </React.Fragment>
  );
}
