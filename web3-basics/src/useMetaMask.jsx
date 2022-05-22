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
    label: "etheruemsd",
    value: 4,
    options: {
      rpc_url: "https://polygon-rpc.com",
      currency: "MATIC",
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

    const currentChainId = await web3.eth.net.getId();

    if (currentChainId !== selectedChain.value) {
      try {
        if (selectedChain.value === 0) return;
        // await window?.ethereum?.request({
        //   method: "wallet_switchEthereumChain",
        //   params: [{ chainId: Web3.utils.toHex(selectedChain.value) }],
        // });
        console.debug("select", selectedChain, currentChainId);
        await web3.currentProvider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: web3.utils.toHex(selectedChain.chainId),
              chainName: selectedChain.label,
              nativeCurrency: selectedChain.options.nativeCurrency,
              rpcUrls: [selectedChain.options.rpc_url],
              // blockExplorerUrls: [selectedChain.options.Explorer],
            },
          ],
        });
      } catch (e) {
        console.debug("switch error", e);
      }
    }
  };

  useEffect(() => {
    onWeb3Connect();
  }, []);

  return [currentAccountState, currentBalance, currentNetwork, onswitchNetwork];
};

export default UseWeb3Connect;