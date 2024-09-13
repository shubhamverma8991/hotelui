import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../service/AuthProvider";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-3 px-1 sm:px-4 md:px-12">
        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
          <span
            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            style={{ letterSpacing: "1px", fontFamily: "'Libre Baskerville', serif" }}
          >
            Hotel Search Engine
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-user"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-user"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`w-full md:block md:w-auto ${isMenuOpen ? "block" : "hidden"}`} id="navbar-user">
          <ul
            className={`font-medium flex ${
              isMenuOpen ? "flex-row flex-wrap" : "md:flex-row"
            } border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center`}
          >
            {isAuthenticated ? (
              <>
                <li className="w-1/2 md:w-auto" style={{ letterSpacing: "1px", fontFamily: "'Libre Baskerville', serif" }}>
                  <Link
                    to="/add"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Add Hotel
                  </Link>
                </li>
                <li className="w-1/2 md:w-auto" style={{ letterSpacing: "1px", fontFamily: "'Libre Baskerville', serif" }}>
                  <Link
                    to="/update"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Update Hotel
                  </Link>
                </li>
                <li className="w-1/2 md:w-auto" style={{ letterSpacing: "1px", fontFamily: "'Libre Baskerville', serif" }}>
                  <button
                    onClick={logout}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="w-1/2 md:w-auto" style={{ letterSpacing: "1px", fontFamily: "'Libre Baskerville', serif" }}>
                <Link
                  to="/login"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  style={{ letterSpacing: "1px", fontFamily: "'Libre Baskerville', serif" }}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
