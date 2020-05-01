import React, { useContext, useReducer } from "react";
import UserContext from "../context/user-context";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const context = useContext(UserContext);
  const history = useHistory();
  // const [] = useState()
  const handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    context.signin({ email: "jci@pdx.edu", password: "password" });
    history.push("/");
  };
  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="email"
          onChange={handleChange}
          placeholder="test@test.com"
          type="text"
        />
        <input
          name="password"
          onChange={handleChange}
          placeholder="password"
          type="text"
        />
        <button>Log in</button>
      </form>
    </div>
  );
}
