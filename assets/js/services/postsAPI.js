import axios from "axios";
import { POSTS_API } from "./configs";


function findAll() {
  return axios
    .get(POSTS_API)
    .then(response => response.data["hydra:member"]);
}

function find(id) {
  return axios.get(POSTS_API + "/" + id).then(response => response.data);
}

export default {
  findAll,
  find
};
