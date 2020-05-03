import React, { useContext, useReducer, useState } from "react";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const context = useContext(AppContext);
  const history = useHistory();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await context.signin({
      email: credentials.email,
      password: credentials.password,
    });
    await history.push("/");
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
