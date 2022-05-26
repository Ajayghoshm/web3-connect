import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ContactList from "./ContactList";
import NewContact from "./NewContact";

const Contact = ({ sendTransaction, getTransactionList }) => {
  const history = useNavigate();
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

  const onContactSubmit = (selectedContact) => {
    setContactList((state) => [...state, selectedContact]);
    history("/contacts/list");
  };

  return (
    <div>
      <Routes>
        <Route
          path="/list"
          element={
            <ContactList
              contactList={contactList}
              getTransactionList={getTransactionList}
              sendTransaction={sendTransaction}
            />
          }
        />
        <Route
          path="/new"
          element={<NewContact onContactSubmit={onContactSubmit} />}
        />
      </Routes>
    </div>
  );
};

export default Contact;
