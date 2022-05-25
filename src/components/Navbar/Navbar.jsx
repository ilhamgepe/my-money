import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  if (user) {
    console.log(user.user.displayName);
  }
  return (
    <div className="navbar bg-green-500/20">
      <div className=" container p-5 mx-auto">
        <ul className="flex items-center">
          <li>
            <Link to={`/`} className={`text-3xl font-bold`}>
              MyMoney
            </Link>
          </li>
          {!user && (
            <>
              <li className="ml-auto">
                <Link to={`/login`} className={`mr-5 text-xl font-medium`}>
                  Login
                </Link>
              </li>
              <li>
                <Link to={`/signup`} className={`text-xl font-medium`}>
                  Signup
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="ml-auto">
                <p className="mr-5 text-xl font-medium">Hello, {user.displayName}</p>
              </li>
              <li className="">
                <button
                  onClick={logout}
                  className="py-1 px-4 mx-3 rounded-md border-4 border-green-500/40 my-5 hover:bg-green-500/50 hover:text-white hover:border-transparent text-slate-800/70 transition-all duration-150 text-xl font-medium"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
