import axios from "axios";

export default () => {
  axios.defaults.headers.common["X-CSRF-TOKEN"] = window.localStorage.csrf;
  // axios.defaults.headers.common[
  //   "Authorization"
  // ] = `Bearer ${window.localStorage.csrf}`;
  console.log("Headers: ", axios.defaults.headers.common);
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
