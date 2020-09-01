import axios from "axios";
import { USERS_API } from "./configs";



function register(user) {
  return axios.post(USERS_API, user);
}

export default {
  register
};