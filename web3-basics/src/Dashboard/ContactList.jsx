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
    <div className="flex flex-col items-center justify-center pt-10">
      <table>
        <thead>
          <th>Name</th>
          <th>Address</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {contactList.map((item) => {
            return (
              <tr key={item.address} className="p-2">
                <td className="p-2 font-bold">{item.name}</td>
                <td className="p-2 font-mono">{item.address}</td>
                <td className="p-2 space-x-2">
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className="p-5 m-2 text-white bg-blue-500 rounded-lg"
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
