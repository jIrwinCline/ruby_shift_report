import React, { useContext, useEffect } from "react";
import UserContext from "../context/user-context";

export default function CurrentUserPage(props) {
  const context = useContext(UserContext);

  useEffect(() => {
    console.log(context);
  }, []);

  return (
    <React.Fragment>
      <button
        onClick={() =>
          context.signin({ email: "jci@pdx.edu", password: "password" })
        }
      >
        Sign in
      </button>
      <button onClick={() => context.logout()}>Logout</button>
      {context.currentUser.email}
      <div>
        <p>Hello </p>
      </div>
      <p>{context.currentUser.test}</p>
    </React.Fragment>
  );
}
