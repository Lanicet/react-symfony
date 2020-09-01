import axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "./configs";


/**
 * Logout (deletion of the token from localStorage and on Axios)
 */
function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

/**
 * HTTP request for authentication and storage of the token in storage and on Axios
 * @param {object} credentials
 */
function authenticate(credentials) {
  return axios
    .post(LOGIN_API, credentials)
    .then(response => response.data.token)
    .then(token => {
      // I store the token in my localStorage
      window.localStorage.setItem("authToken", token);
      // We warn Axios that we now have a default header on all our future HTTP requests
      setAxiosToken(token);
    });
}

/**
 * Place the JWT token on Axios
 * @param {string} token The JWT token
 */
function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Setting up when loading the application
 */
function setup() {
  // 1. check if we have a token
  const token = window.localStorage.getItem("authToken");
  // 2. If the token is still valid
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
    }
  }
}

/**
 * Allows you to know if you are authenticated or not
 * @returns boolean
 */
function isAuthenticated() {
  // 1. check if we have a token
  const token = window.localStorage.getItem("authToken");
  // 2. If the token is still valid
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}

export default {
  authenticate,
  logout,
  setup,
  isAuthenticated
};
