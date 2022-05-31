import React, { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { response, addDocument } = useFirestore("transactions");
  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ name, amount, uid });
  };

  //reset the form fields
  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);

  function numberWithCommas(value) {
    let amount = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return amount;
  }
  console.log(numberWithCommas("100000"));
  return (
    <div className="">
      <h3 className="title">Add a Transaction</h3>
      <form
        onSubmit={handleSubmit}
        className="bg-green-600 rounded p-3 max-w-xs mx-auto md:ml-0"
      >
        <label>
          <span>Transaction name:</span>
          <input
            className="rounded outline-none border-none"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            className="rounded outline-none border-none"
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button className="btn bg-green-500/50">Add Transaction</button>
      </form>
    </div>
  );
}
