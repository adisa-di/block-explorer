import React, { useEffect, useState } from "react";
import { getCurrentBlock } from "../../api/etherscan";

import "./BlockInfo.css";

function BlockInfo() {
  const [blockNo, setBlockNo] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCurrentBlock()
      .then(({ data }) => {
        const { blockNo } = data;
        setBlockNo(blockNo);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div>Latest Block: </div>
      <div> { loading ?  "Loading..." : blockNo } </div>
    </div>
  );
}

export { BlockInfo };