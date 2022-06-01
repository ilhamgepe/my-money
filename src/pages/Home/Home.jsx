import React from "react";
import TransactionForm from "./TransactionForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import TransactionList from "../../components/TransactionList/TransactionList";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("transactions", null, [
    "createdAt",
    "desc",
  ]);
  // console.log(documents);
  return (
    <div className="container mx-auto py-5">
      <div className="md:grid md:grid-cols-12 mx-auto">
        <div className="md:col-span-8 mb-8 mx-3">
          {error && <div className="text-red-500">{error}</div>}
          {documents && <TransactionList transactions={documents} />}
          {(!documents || documents.length === 0) && (
            <div>
              <p className="">
                No transaction found. please add some transactions
              </p>
            </div>
          )}
        </div>
        <div className="md:col-span-4 mb-8">
          <TransactionForm uid={user.uid} />
        </div>
      </div>
    </div>
  );
}
