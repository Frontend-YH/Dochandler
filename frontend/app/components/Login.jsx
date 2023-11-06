import React, { useState, useEffect } from "react";
import Header from "./Header";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userEventHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordEventHandler = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    
    if (username !== "" && password !== "") {
      console.log(username, password);
        const res = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (res.ok) {

          const data = await res.json();
          const user = { id: data.id, username };
        
          localStorage.setItem("user", JSON.stringify(user));

          console.log(res,"response")
          setUsername("");
          setPassword("");
          props.setLoggedIn(true)
          } else {
          alert("Wrong login!");
          setUsername("");
          setPassword("");
          props.setLoggedIn(false)
        }
      } 
  };

  return (
    <>
      <Header />
      <form onSubmit={handleLogin}>
        <input
          className="mt-5 border-solid border-2 border-black rounded-xl"
          placeholder="Användarnamn"
          type="text"
          value={username}
          onChange={userEventHandler}
        />
        <br />
        <input
          className="border-solid border-2 border-black rounded-xl"
          placeholder="Lösenord"
          type="password"
          value={password}
          onChange={passwordEventHandler}
        />
        <br />
        <button
          className="mt-5 bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
          type="submit"
          onSubmit={handleLogin}
        >
          login
        </button>
      </form>
    </>
  );
}
