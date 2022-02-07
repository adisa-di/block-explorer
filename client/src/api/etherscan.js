import axios from "axios";

export function getLatestBlock(network="homestead") {
  return axios.get(`http://localhost:3002/block/${network}`);
}