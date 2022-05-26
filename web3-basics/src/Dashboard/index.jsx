import React, { useEffect, useState } from "react";
import UseWeb3Connect from "../useMetaMask";
import Select from "react-select";
import Contact from "./Contact";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Details from "./Details";

const Dashboard = () => {
  const history = useNavigate();

  const [
    currentAccount,
    currentBalance,
    currentNetwork,
    onswitchNetwork,
    sendTransaction,
    getTransactionList,
  ] = UseWeb3Connect();

  console.debug(
    "currentAccount",
    currentAccount,
    currentBalance,
    currentNetwork
  );

  const onContactsClick = () => {
    history("/contacts/list");
  };

  return (
    <Routes>
      <Route
        index
        element={
          <Details
            currentAccount={currentAccount}
            currentBalance={currentBalance}
            currentNetwork={currentNetwork}
            onContactsClick={onContactsClick}
            onswitchNetwork={onswitchNetwork}
          />
        }
      />
      <Route
        path="/contacts/*"
        element={
          <Contact
            sendTransaction={sendTransaction}
            getTransactionList={getTransactionList}
          />
        }
      />
    </Routes>
  );
};

export default Dashboard;
