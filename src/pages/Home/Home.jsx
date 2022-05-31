import React from "react";
import TransactionForm from "./TransactionForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import TransactionList from "../../components/TransactionList/TransactionList";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("transactions");
  return (
    <div className="container mx-auto py-5">
      <div className="md:grid md:grid-cols-12 mx-auto">
        <div className="md:col-span-8 mb-8 mx-3">
          {error && <div className="text-red-500">{error}</div>}
          {documents && <TransactionList documents={documents} user={user} />}
          {/* {documents && (
            <div>
              {documents.map((doc) => {
                if (user.uid === doc.uid) {
                  return (
                    <div key={doc.id}>
                      <p>{doc.name}</p>
                      <p>{doc.amount}</p>
                    </div>
                  );
                }
              })}
            </div>
          )} */}
        </div>
        <div className="md:col-span-4 mb-8">
          <TransactionForm uid={user.uid} />
        </div>
      </div>
    </div>
  );
}
