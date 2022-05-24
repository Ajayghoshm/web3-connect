import React, { useEffect, useState } from "react";
import UseWeb3Connect from "../useMetaMask";
import Select from "react-select";
import Contact from "./Contact";

const networkOptions = [
  {
    label: "Polygon Mainnet",
    value: 137,
  },
  {
    label: "Rinkby",
    value: 4,
  },
];

const Dashboard = () => {
  const [selectedChain, setSelectedChain] = useState();

  const [
    currentAccount,
    currentBalance,
    currentNetwork,
    onswitchNetwork,
    sendTransaction,
  ] = UseWeb3Connect();

  console.debug(
    "currentAccount",
    currentAccount,
    currentBalance,
    currentNetwork
  );

  return (
    <div>
      Dashboard
      <div>{currentAccount}</div>
      <div>{currentBalance}</div>
      <div>{currentNetwork}</div>
      <Select
        options={networkOptions}
        value={selectedChain}
        onChange={(e) => setSelectedChain(e)}
      />
      <button onClick={(e) => onswitchNetwork(selectedChain.value)}>
        Switch Network
      </button>
      <Contact sendTransaction={sendTransaction} />
    </div>
  );
};

export default Dashboard;
