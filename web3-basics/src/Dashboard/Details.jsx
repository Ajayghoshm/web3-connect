import { useState } from "react";
import Select from "react-select";

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

const Details = ({
  currentAccount,
  currentBalance,
  currentNetwork,
  onswitchNetwork,
  onContactsClick,
}) => {
  const [selectedChain, setSelectedChain] = useState();
  return (
    <div className="">
      <div className="text-3xl">Dashboard</div>

      <div className="space-x-2">
        <span className="font-bold">Account</span>
        <span>{currentAccount}</span>
      </div>
      <div className="space-x-2">
        <span className="font-bold">Balance</span>
        <span>{currentBalance}</span>
      </div>
      <div className="space-x-2">
        <span className="font-bold">Current Network</span>
        <span>{currentNetwork}</span>
      </div>
      <div className="flex justify-evenly ">
        <Select
          className="w-56"
          options={networkOptions}
          value={selectedChain}
          onChange={(e) => setSelectedChain(e)}
        />
        <button
          className="p-3 text-white bg-blue-400 rounded-md"
          onClick={(e) => onswitchNetwork(selectedChain.value)}
        >
          Switch Network
        </button>
      </div>
      <button
        className="p-3 text-white bg-blue-400 rounded-md"
        onClick={() => {
          onContactsClick();
        }}
      >
        View Contacts
      </button>
    </div>
  );
};

export default Details;
