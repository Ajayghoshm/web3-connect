import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactList = ({ contactList, sendTransaction, getTransactionList }) => {
  const history = useNavigate();
  const onAddContact = () => {
    history("/contacts/new");
  };
  const [transactionList, setTransactionList] = useState([]);
  const onTransactionView = async (address) => {
    let value = await getTransactionList(address);
    setTransactionList(value);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      {contactList.map((item) => {
        return (
          <div
            key={item.address}
            className="flex items-center justify-center space-x-4 space-y-4"
          >
            <div className="font-bold w-28">{item.name}</div>
            <div className="font-mono">{item.address}</div>
            <button
              className="p-5 text-white bg-blue-500 rounded-lg"
              onClick={() => {
                sendTransaction(item, 0.0001);
              }}
            >
              Send Money
            </button>
            <button
              className="p-5 text-white bg-blue-500 rounded-lg"
              onClick={() => {
                onTransactionView(item.address);
              }}
            >
              View Transactions
            </button>
          </div>
        );
      })}
      <button
        className="p-5 text-white bg-blue-500 rounded-lg"
        onClick={() => onAddContact()}
      >
        Add Contact
      </button>
      <div>
        <div className="py-4 text-lg"> TransactionList</div>
        <div>
          {transactionList.map((item) => {
            return (
              <div>
                <div className="flex space-x-2 ">
                  <div className="font-semibold">BlockNumber</div>
                  <div> {item.blockNumber}</div>
                </div>
                <div className="flex space-x-2 ">
                  <div className="font-semibold">From</div>
                  <div> {item.from}</div>
                </div>
                <div className="flex space-x-2 ">
                  <div className="font-semibold">To</div>
                  <div> {item.to}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
