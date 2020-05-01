import axios from "axios";

export default () => {
  axios.defaults.headers.common["X-CSRF-TOKEN"] = localStorage.csrf;
  console.log(axios.defaults.headers.common["X-CSRF-TOKEN"]);
  return axios.create({
    baseURL: "http://localhost:3000",
    // withCredentials: true,
    headers: {
      Accept: "applicaton/json",
      "Content-Type": "application/json",
    },
  });
};
