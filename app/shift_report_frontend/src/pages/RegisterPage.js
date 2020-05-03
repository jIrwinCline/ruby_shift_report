import React, { useContext, useReducer, useState } from "react";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";

export default function Register(props) {
  const context = useContext(AppContext);
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    fname: "",
    lname: "",
    dpsst: "",
  });
  const handleChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await context.register({
      email: userDetails.email,
      password: userDetails.password,
      password_confirmation: userDetails.passwordConfirmation,
      fname: userDetails.fname,
      lname: userDetails.lname,
      dpsst: userDetails.dpsst,
    });
    await history.push("/");
  };
  return (
    <div>
      <h2>Sign up</h2>
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
        <input
          name="passwordConfirmation"
          onChange={handleChange}
          placeholder="password confirmation"
          type="text"
        />
        <input
          name="fname"
          onChange={handleChange}
          placeholder="Firstname"
          type="text"
        />
        <input
          name="lname"
          onChange={handleChange}
          placeholder="Last name"
          type="text"
        />
        <input
          name="dpsst"
          onChange={handleChange}
          placeholder="00000"
          type="text"
        />
        <button>Register</button>
      </form>
    </div>
  );
}
