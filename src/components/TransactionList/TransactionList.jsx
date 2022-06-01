import React from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore("transactions");
  console.log(transactions);

  return (
    <div className="">
      <p className="mb-3 font-semibold">Transaction List</p>
      {transactions.map((transaction) => {
        return (
          <div
            className="p-3 px-7 border-l-4 relative border-green-500/80 rounded shadow-md my-3 flex "
            key={transaction.id}
          >
            <p className="mr-auto">{transaction.name}</p>
            <p className="font-bold text-slate-600 text-right">
              {transaction.amount}
            </p>
            <button
              onClick={() => deleteDocument(transaction.id)}
              className="absolute top-0 right-0 bg-pink-500 rounded-b-none rounded-tr p-1 text-sm font-bold text-white hover:bg-pink-600 hover:text-slate-600 transition-all duration-150"
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}
