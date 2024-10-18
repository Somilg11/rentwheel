import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LoginButton = () => {
  const [redirect, setRedirect] = useState(false);

  const handleLoginClick = () => {
    setRedirect(true); // Set the state to trigger redirect
  };

  // Redirect if the state changes to true
  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Button
      onClick={handleLoginClick}
      className="text-sm lg:text-base px-4 py-2 lg:px-6 lg:py-3"
    >
      Login
    </Button>
  );
};

export default LoginButton;
