import { Route, Routes } from "react-router-dom";
import "./index.css";

/* Layout Components */
import { Navbar } from "@/components/Navbar";

/* Landing Page */
import LandingPage from "@/pages/LandingPage";

// Mock user for demo - replace with real auth state
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatarUrl: undefined,
};

function App() {
  const handleLogout = () => {
    console.log("Logout clicked");
    // TODO: Implement actual logout logic with Supabase
  };

  return (
    <>
      <Navbar user={mockUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
