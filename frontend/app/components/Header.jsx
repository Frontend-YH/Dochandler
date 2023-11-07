import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn && JSON.parse(userLoggedIn)) {
      setIsLoggedIn(true);
    }
  }, []);
  const signOut = () => {
localStorage.removeItem("userID");
localStorage.removeItem("isLoggedIn");
window.location.reload();
  };

  return (
    <header className="flex flex-row space-x-10">
      <div className="max-w-screen-xl">
        <h1 className="font-bold lg:text-3xl py-3">Dokumenthanteraren</h1>
      </div>

      {isLoggedIn && (
        <button
          className="bg-red-500 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded"
          onClick={signOut}
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Logga ut
        </button>
      )}
    </header>
  );
};

export default Header;
