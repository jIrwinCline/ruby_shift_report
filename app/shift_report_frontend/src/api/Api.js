import axios from "axios";

export default () => {
  axios.defaults.headers.common["X-CSRF-TOKEN"] = window.localStorage.csrf;
  return axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    headers: {
      Accept: "applicaton/json",
      "Content-Type": "application/json",
    },
  });
};
