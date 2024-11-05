import './App.css'
import { useState } from "react"
import Reviews from "./components/Reviews.jsx"
import Header from "./components/Header.jsx"

function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <>
      <Header setIsAdmin={setIsAdmin} />
      <Reviews isAdmin={isAdmin} />
    </>
  )
}

export default App
