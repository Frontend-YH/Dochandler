import React from "react"

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full min-h-[calc(100vh-6rem)] w-screen bg-amber-50 border-2">
      <div className="">{children}</div>
    </main>
  )
}