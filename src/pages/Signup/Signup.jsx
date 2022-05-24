import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  let history = useHistory();

  const { signup, error, pending } = useSignup();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, displayName);
    signup(email, password, displayName);
    // history.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className={`max-w-lg p-5 mx-auto`}>
      <h2 className="text-2xl font-bold">Signup</h2>
      <label>
        <span className="text-lg font-semibold">Email:</span>
        <input
          className="rounded font-semibold  focus:border-green-500/50 focus:outline-none focus:ring-green-500/50"
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
      <label>
        <span className="text-lg font-semibold">Display Name:</span>
        <input
          className="rounded font-semibold focus:border-green-500/50 focus:outline-none focus:ring-green-500/50"
          onChange={(e) => {
            let name = e.target.value.replace(/ /g, "");
            setDisplayName(name);
          }}
          value={displayName}
          type="text"
        />
      </label>
      {!pending && (
        <button className="py-1 px-4 rounded-md border-4 border-green-500/40 my-5 hover:bg-green-500/50 hover:text-white hover:border-transparent font-semibold text-green-500/50 transition-all duration-150">
          Signup
        </button>
      )}
      {pending && (
        <button
          disabled
          className="py-1 px-4 rounded-md border-4 border-green-500/40 my-5 hover:bg-green-500/50 hover:text-white hover:border-transparent font-semibold text-green-500/50 transition-all duration-150"
        >
          Loading
        </button>
      )}
      {error && <p className="text-red-400">{error}</p>}
    </form>
  );
}
