import React, { useContext, useEffect } from "react";
import UserContext from "../context/user-context";

export default function CurrentUserPage(props) {
  const context = useContext(UserContext);

  useEffect(() => {
    console.log(context);
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
