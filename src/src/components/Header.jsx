import { useState } from "react";
import LoginOverlay from "./LoginOverlay";

function Header({ setIsAdmin }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [username, setUsername] = useState("");

  const handleLoginClick = () => setIsOverlayOpen(true);
  const handleCloseOverlay = () => setIsOverlayOpen(false);
  const handleLoginSuccess = (username) => {
    setUsername(username);
    if (username === "admin") setIsAdmin(true)
    else setIsAdmin(false)
  }

  return (
    <div
      style={{
        borderBottom: "2px solid green",
        display: "flex",
        alignItems: "center",
        padding: "10px",
      }}
    >
      {username ? (
        <p>Welcome, {username}!</p>
      ) : (
        <button onClick={handleLoginClick}>Login</button>
      )}
      
      {isOverlayOpen && (
        <LoginOverlay onClose={handleCloseOverlay} onLogin={handleLoginSuccess} />
      )}
    </div>
  );
}

export default Header;
