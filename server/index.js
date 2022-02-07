const express = require('express');
const cors = require('cors')
const { providers } = require('ethers');
const bodyParser = require('body-parser');
const { parse } = require('path/posix');

// consts
const PORT = 3002;
const NETWORK = null; // mainnet

// app set up
const app = express();

app.use(cors());
app.use(bodyParser.json());

// etherscan provider
const provider = new providers.EtherscanProvider(NETWORK, process.env.ETHSCAN_API_KEY);

const getLatestBlock = async () => {
  return provider.perform("getBlock", {blockTag: "latest"});
}

app.get('/currentBlock', (req, res) => {

  // get the latest block number from the network 
  getLatestBlock()
    .then(({ number }) => {
      res.json({ blockNo: parseInt(number) });
    })
    .catch((err) => {
      
    });
});

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});