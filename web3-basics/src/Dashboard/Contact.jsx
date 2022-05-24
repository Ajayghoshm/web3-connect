import { useState } from "react";

const Contact = ({ sendTransaction }) => {
  const [selectedContact, setSelectedContact] = useState({
    name: "",
    address: "",
  });
  const [contactList, setContactList] = useState([
    {
      name: "Ajayghosh",
      address: "0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B",
    },
    {
      name: "Ajay",
      address: "0xc5f1d05d25b1a296d2c545ef98b296b7dc110132",
    },
  ]);

  const onContactSubmit = () => {
    setContactList((state) => [...state, selectedContact]);
  };

  return (
    <div>
      {contactList.map((item) => {
        return (
          <div key={item.address} className="flex">
            <div className="">{item.name}</div>
            <div>{item.address}</div>
            <button
              onClick={() => {
                sendTransaction(item, 1);
              }}
            >
              Send Money
            </button>
          </div>
        );
      })}
      <div>
        <input
          value={selectedContact.name}
          onChange={(e) => {
            e.preventDefault();
            setSelectedContact((state) => ({ ...state, name: e.target.value }));
          }}
        />
        <input
          value={selectedContact.address}
          onChange={(e) => {
            e.preventDefault();
            setSelectedContact((state) => ({
              ...state,
              address: e.target.value,
            }));
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onContactSubmit();
          }}
        >
          add new contact
        </button>
      </div>
    </div>
  );
};

export default Contact;
