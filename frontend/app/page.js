"use client";
import Login from './components/Login';
import Mainpage from './components/Mainpage'
import React, { useState } from 'react';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      {loggedIn ? <Mainpage /> : <Login setLoggedIn = {setLoggedIn} />}
    </main>
  )
}