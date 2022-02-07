import React, { useEffect, useState } from "react";
import { getCurrentBlock } from "../../api/etherscan";
import { Loading } from "../../components";

import "./BlockInfo.css";

const displayKey = new Set([ "baseFeePerGas", "difficulty", "gasLimit",  "miner", "size", "nonce" ]);
const labels = {
  "baseFeePerGas": "Base Fee Per Gas",
  "difficulty": "Difficulty",
  "gasLimit": "Gase Limit",
  "miner": "Miner",
  "size": "Size",
  "nonce": "Nonce"
}

function InfoTable({ info }) {

  return (
    <table className="table_info">
      <tbody>
        { 
          Object.keys(info).map((key, idx) => {
            if (!displayKey.has(key)) return (<></>);
            return (
              <tr key={idx}>
                <td className="label_item">{labels[key]}</td>
                <td>{info[key]}</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>  
  );
}

function BlockInfo() {
  const [blockInfo, setBlockInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCurrentBlock()
      .then(({ data }) => {
        setBlockInfo(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="title"> Block Explorer </div>
      { loading ? <Loading/> : 
          <div>
            <div className="section"> Current Block #: {parseInt(blockInfo.number)} </div>
            <InfoTable info={blockInfo}/> 
          </div>
      } 
    </div>
  );
}

export { BlockInfo };