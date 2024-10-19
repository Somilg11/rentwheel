import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios"; 
import { toast } from "react-hot-toast"; 
import { useNavigate } from "react-router-dom"; 

const LoginButton = ({ isLoggedIn, setIsLoggedIn }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      // Redirect user to the /login page
      navigate('/login'); 
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed: Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); 
    toast.success("Logged out successfully");
    window.location.reload(); // Refresh page to reflect logout status
  };

  return (
    <>
      {isLoggedIn ? (
        <Button onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button onClick={handleLogin} disabled={loading}>
          Login
        </Button>
      )}
    </>
  );
};

export default LoginButton;
