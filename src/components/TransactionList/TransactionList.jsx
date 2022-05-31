import React from "react";

export default function TransactionList({ documents, user }) {
  //   console.log(documents);
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };
  return (
    <div className="">
      <p className="mb-3 font-semibold">Transaction List</p>
      {documents.map((doc) => {
        if (user.uid === doc.uid) {
          return (
            <div
              className="p-3 border-l-4 border-green-500/80 rounded shadow-md my-3 flex "
              key={doc.id}
            >
              <p className="mr-auto">{doc.name}</p>
              <p className="font-bold text-slate-600 text-right">
                {formatRupiah(doc.amount)}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
}
