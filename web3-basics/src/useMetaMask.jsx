import { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min.js";

const networkOptions = [
  {
    label: "Polygon Mainnet",
    chainId: 137,
    options: {
      rpc_url: "https://polygon-rpc.com",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      Explorer: " https://polygonscan.com/",
    },
  },
  {
    label: "rinkeby",
    chainId: 4,
    options: {
      rpc_url: "https://rinkeby.infura.io/v3/",
      currency: "ETH",
      Explorer: " https://polygonscan.com/",
    },
  },
];

const UseWeb3Connect = () => {
  const [currentAccountState, setCurrentAccountState] = useState();
  const [currentBalance, setCurrentBalance] = useState();
  const [currentNetwork, setCurrentNetwork] = useState();
  const [web3, setWeb3] = useState();

  const detectWeb3Provider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3.currentProvider) {
      provider = window.web3.currentProvider;
    } else {
      provider = null;
    }
    return provider;
  };

  const onWeb3Connect = async () => {
    try {
      const currentProvider = detectWeb3Provider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0];
        setCurrentAccountState(currentAccount);

        const balance = await web3.eth.getBalance(currentAccount);
        setCurrentBalance(balance);

        const currentNetwork = await web3.eth.net.getNetworkType();
        console.debug(currentNetwork, "network");
        setCurrentNetwork(currentNetwork);
      } else {
        throw new Error();
      }
    } catch (err) {}
  };

  const onswitchNetwork = async (selectedChainId) => {
    const selectedChain = networkOptions.find((item) => {
      return item.chainId === selectedChainId;
    });

    console.debug("selected chain", selectedChain);

    const currentChainId = await web3.eth.net.getId();
    try {
      if (selectedChain.chainId === 0) return;
      await window?.ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(selectedChain.chainId) }],
      });
      console.debug("select", selectedChain, currentChainId);
    } catch (e) {
      console.debug("switch error", e);
      if (e.code === 4902) {
        await web3.currentProvider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: web3.utils.toHex(selectedChain.chainId),
              chainName: selectedChain.label,
              nativeCurrency: selectedChain.options.nativeCurrency,
              rpcUrls: [selectedChain.options.rpc_url],
            },
          ],
        });
      }
    }
    onWeb3Connect();
  };

  async function getTransactionsByAccount(
    myaccount,
    startBlockNumber,
    endBlockNumber
  ) {
    if (endBlockNumber == null) {
      endBlockNumber = await web3.eth.getBlockNumber();
      console.log("Using endBlockNumber: " + endBlockNumber);
    }
    if (startBlockNumber == null) {
      startBlockNumber = endBlockNumber - 20;
      console.log("Using startBlockNumber: " + startBlockNumber);
    }
    console.log(
      'Searching for transactions to/from account "' +
        myaccount +
        '" within blocks ' +
        startBlockNumber +
        " and " +
        endBlockNumber
    );
    let transList = [];
    for (var i = startBlockNumber; i <= endBlockNumber; i++) {
      console.log("Searching block " + i);
      var block = await web3.eth.getBlock(i, true);
      if (block != null && block.transactions != null) {
        console.log("block", block);
        let filter = block.transactions.filter((item) => {
          return (
            (item.from && item.from.toLowerCase() === myaccount) ||
            (item.to && item.to.toLowerCase() === myaccount)
          );
        });
        console.debug("newfilter", filter);
        if (filter.length) transList.push(filter);
      }
      console.debug("transList", transList);
    }
    return transList.flat();
  }

  const getTransactionList = async (address) => {
    return await getTransactionsByAccount(address.toLowerCase());
  };

  const sendTransaction = (item, amount) => {
    console.debug("values", item, amount);
    web3.eth.sendTransaction({
      from: currentAccountState,
      to: item.address,
      value: web3.utils.toWei(amount.toString(), "ether"),
    });
  };

  useEffect(() => {
    onWeb3Connect();
  }, []);

  return [
    currentAccountState,
    currentBalance,
    currentNetwork,
    onswitchNetwork,
    sendTransaction,
    getTransactionList,
  ];
};

export default UseWeb3Connect;
