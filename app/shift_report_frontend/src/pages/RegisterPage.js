import React, { useContext, useReducer, useState } from "react";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";

import RegisterForm from "../components/registerForm/RegisterForm";

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
      <RegisterForm />
    </div>
  );
}
