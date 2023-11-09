import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const userString = localStorage.getItem("userID");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userObject = JSON.parse(userString);
  const username = userObject?.username; 
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
    <header className="flex flex-col space-x-10 xl:flex-row lg:flex-row">
      <div className="max-w-screen-xl">
        <h1 className="font-bold lg:text-3xl py-3">Dokumenthanteraren</h1>
      </div>

      {isLoggedIn && (
        <>
        {/* <p><strong>{username}</strong></p> */}
        <button
          className="bg-red-500 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded"
          onClick={signOut}
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Logga ut
        </button>
        </>
      )}
    </header>
  );
};

export default Header;
