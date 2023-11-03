"use client";
import Login from './components/Login';
import Mainpage from './components/Mainpage'



export default function Home() {
  
  console.log()
  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      <Login>
     <Mainpage> </Mainpage>
     </Login>    
    </main>
  )
}
