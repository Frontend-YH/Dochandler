import React, { useState, useEffect } from 'react';
import Header from './Header';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState("");


  useEffect(() => {
    // Perform localStorage action
    setLoggedInUser(localStorage.getItem("loggedinUser") || "")
    
  }, [])

const userEventHandler = ((event) => {
    // Changed to to lower Case to fix bug
    setUsername(event.target.value.toLowerCase());
}) 

const passwordEventHandler = ((event) => {
    setPassword(event.target.value);
}) 


// LOGIN FORM SUBMIT
const handleLogin = async (event) =>  {
     event.preventDefault();
     // Double check that the fields are not empty
     if (username!=="" && password !=="") {
        const res = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password})
        })

        // If DB response OK:
        if (res.ok) {
            localStorage.setItem('user', username);
            let data = await res.json();      
            localStorage.setItem('userId', data[0]);
            setUsername("");
            setPassword("");
            window.location.reload();
            //router.push("/");

        } else { alert("Wrong login!"); }
    } else {
        alert("Fields are empty!")
    }
}

 // Handle Logout
 const handleLogout = async (event) =>  {
    event.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    //router.push("/");
    window.location.reload();
 }


  return (
    <>
      <Header />
      <form onSubmit={handleLogin}>
        <input
          className='mt-5 border-solid border-2 border-black rounded-xl'
          placeholder="userName"
          type="text"
          value={username}
          onChange={userEventHandler} 
        />
        <br />
        <input
          className='border-solid border-2 border-black rounded-xl'
          placeholder="Password"
          type="password"
          value={password}
          onChange={passwordEventHandler} 
        />
        <br />
        <button
          className="mt-5 bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
          type='submit'
        >
          login
        </button>
      </form>
    </>
  );
}
