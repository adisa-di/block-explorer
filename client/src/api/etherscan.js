import axios from "axios";

export function getCurrentBlock() {
  return axios.get("http://localhost:3002/currentBlock");
}