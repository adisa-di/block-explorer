import axios from "axios";

const baseUrl = `http://localhost:3002`;

export function getLatestBlock(network="homestead") {
  return axios.get(`${baseUrl}/block/${network}`);
}

export function getTransaction(hash) {
  // console.log(hash);
  return axios.get(`${baseUrl}/transaction/${hash}`);
}