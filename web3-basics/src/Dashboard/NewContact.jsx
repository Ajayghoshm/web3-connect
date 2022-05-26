import React, { useState } from "react";

const NewContact = ({ onContactSubmit }) => {
  const [selectedContact, setSelectedContact] = useState({
    name: "",
    address: "",
  });
  return (
    <div className="py-4">
      <h1 className="text-3xl">Add new contact</h1>
      <div className="flex flex-col items-center justify-center m-4 space-y-3">
        <div className="flex space-x-2 ">
          <div className="w-20">Name</div>
          <input
            className="p-1 border-2 rounded-md "
            value={selectedContact.name}
            onChange={(e) => {
              e.preventDefault();
              setSelectedContact((state) => ({
                ...state,
                name: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex space-x-2 ">
          <div className="w-20">Address</div>
          <input
            className="p-1 border-2 rounded-md "
            value={selectedContact.address}
            onChange={(e) => {
              e.preventDefault();
              setSelectedContact((state) => ({
                ...state,
                address: e.target.value,
              }));
            }}
          />
        </div>
        <button
          className="p-2 text-white bg-blue-600 rounded-md"
          onClick={(e) => {
            e.preventDefault();
            onContactSubmit(selectedContact);
          }}
        >
          Add new contact
        </button>
      </div>
    </div>
  );
};

export default NewContact;
