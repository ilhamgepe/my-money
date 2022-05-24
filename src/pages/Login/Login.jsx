import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, pending } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <form onSubmit={handleSubmit} className={`max-w-lg p-5 mx-auto`}>
      <h2 className="text-2xl font-bold">Login</h2>
      <label>
        <span className="text-lg font-semibold">Email:</span>
        <input
          className="rounded font-semibold focus:border-green-500/50 focus:outline-none focus:ring-green-500/50"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </label>
      <label>
        <span className="text-lg font-semibold">Password:</span>
        <input
          className="rounded font-semibold focus:border-green-500/50 focus:outline-none focus:ring-green-500/50"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </label>
      {!pending ? (
        <button className="py-1 px-4 rounded-md border-4 border-green-500/40 my-5 hover:bg-green-500/50 hover:text-white hover:border-transparent font-semibold text-green-500/50 transition-all duration-150">
          Login
        </button>
      ) : (
        <button
          disabled
          className="py-1 px-4 rounded-md border-4 border-green-500/40 my-5 hover:bg-green-500/50 hover:text-white hover:border-transparent font-semibold text-green-500/50 transition-all duration-150"
        >
          Loading
        </button>
      )}
      {/* {pending && } */}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
