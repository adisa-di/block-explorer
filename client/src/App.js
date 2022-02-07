import React, { useEffect, useState } from "react";

import { getCurrentBlock } from "./api/etherscan";
import './App.css';

function App() {

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
    <div className="App">
      <div>Latest Block: </div>
      <div> { loading ?  "Loading..." : blockNo } </div>
    </div>
  );
}

export default App;
