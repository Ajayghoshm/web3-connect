import React, { useEffect, useState } from "react";
import UseWeb3Connect from "../useMetaMask";
import Select from "react-select";

const networkOptions = [
  {
    label: "Polygon Mainnet",
    value: 137,
  },
  {
    label: "etheruemsd",
    value: 4,
  },
];

const Dashboard = () => {
  const [selectedChain, setSelectedChain] = useState();

  const [currentAccount, currentBalance, currentNetwork, onswitchNetwork] =
    UseWeb3Connect();

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
    </div>
  );
};

export default Dashboard;
