const express = require('express');
const cors = require('cors')
const { providers } = require('ethers');
const bodyParser = require('body-parser');
const { parse } = require('path/posix');

// consts
const PORT = 3002;

// app set up
const app = express();

app.use(cors());
app.use(bodyParser.json());

// etherscan provider
let provider = null;
let NETWORK = null; // main

const getLatestBlock = async () => {
  return provider.perform("getBlock", {blockTag: "latest"});
}

app.get('/block/:network', (req, res) => {

  const { network } = req.params;
  if (NETWORK !== network) {
    // re-set network and re-initilize the provider
    NETWORK = network; 
    provider = new providers.EtherscanProvider(NETWORK, process.env.ETHSCAN_API_KEY);
  }

  // get the latest block number from the network 
  getLatestBlock()
    .then(response => {
      res.json(response);
    })
    .catch((err) => {
      
    });
});

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});