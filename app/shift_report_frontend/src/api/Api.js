import axios from "axios";

export default () => {
  axios.defaults.headers.common["X-CSRF-TOKEN"] = window.localStorage.csrf;
  console.log(axios.defaults.headers.common["X-CSRF-TOKEN"]);
  return axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    headers: {
      // "X-CSRF-TOKEN": localStorage.csrf,
      Accept: "applicaton/json",
      "Content-Type": "application/json",
    },
  });
};
