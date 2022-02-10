import React, { useEffect, useState } from "react";
import { getLatestBlock, getTransaction } from "../../api/etherscan";
import { Loading } from "../../components";

// dropdowns
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import "./BlockInfo.css";

const displayKey = new Set([ "baseFeePerGas", "difficulty", "gasLimit",  "miner", "size", "nonce", "transactions" ]);
const labels = {
  "baseFeePerGas": "Base Fee Per Gas",
  "difficulty": "Difficulty",
  "gasLimit": "Gas Limit",
  "miner": "Miner",
  "size": "Size",
  "nonce": "Nonce",
  "transactions": "Transactions"
}


function InfoTable({ info, selectTrnx }) {

  return (
    <table className="table_info">
      <tbody>
        { 
          Object.keys(info).map((key, idx) => {
            if (!displayKey.has(key)) return (<></>);
            
            return (
              <tr key={idx}>
                <td className="label_item">{labels[key]}</td>
                {
                  key === "transactions"  
                    ? <div className="trnx_container">
                        { 
                          info[key].map(trx => {
                            return  <div className="single_trnx" onClick={() => selectTrnx(trx)}>
                                      {trx}
                                    </div>;
                          })
                        }
                      </div>
                    : <td>{info[key]}</td>
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>  
  );
}

function BlockInfo() {

  const options = ['homestead', 'ropsten', 'rinkeby', 'kovan', 'goerli'];  
  const defaultOption = options[0];

  const [blockInfo, setBlockInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState('homestead');

  useEffect(() => {
    setLoading(true);
    getLatestBlock(network)
      .then(({ data }) => {
        setBlockInfo(data);
        setLoading(false);
      });
  }, [network]);

  const selectTrnx = (hash) => {
    setLoading(true);
    getTransaction(hash)
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
      });
  }

  return (
    <div className="container">
      <div className="title"> Block Explorer </div>
      <div className="section network_select">
          <span className="network_text">Querying from network: </span>
          {/* <div>
            Block 
            Account
          </div> */}
          <Dropdown options={options} onChange={(e) => setNetwork(e.value)} value={defaultOption} placeholder="Select an option" />
      </div>

      { loading ? <Loading/> : 
          <div>
            <div className="section"> Current Block #: {parseInt(blockInfo.number)} </div>
            <InfoTable info={blockInfo} selectTrnx={selectTrnx}/> 
          </div>
      } 
    </div>
  );
}

export { BlockInfo };