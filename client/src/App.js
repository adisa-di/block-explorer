import React, { useEffect, useState } from "react";

import { getCurrentBlock } from "./api/etherscan";
import './App.css';

function App() {

  const [blockNo, setBlockNo] = useState(0);

  
  useEffect(() => {
    getCurrentBlock()
      .then(({ data }) => {
        const { blockNo } = data;
        setBlockNo(blockNo);
      });
  }, []);

  return (
    <div className="App">
      <div>Latest Block: </div>
      <div> { blockNo } </div>
    </div>
  );
}

export default App;
