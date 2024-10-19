import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Navigate, Link } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// This is a placeholder function. Replace it with your actual API call.
const loginUser = async (credentials) => {
  try {
    const response = await axios.post('http://localhost:3000/user/login', credentials);
    return response.data; // Assuming the backend sends { message: "Login successful", token: "..." }
  } catch (error) {
    console.error('Login failed', error);
    return null;
  }
};

export default function LoginPage() {
  const navigate = useNavigate(); // Correct function for navigation in React Router v6
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [redirectTo, setRedirectTo] = useState(null); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(credentials);
      
      if (result && result.token) { // Check if the token is present in the response
        console.log('Login successful:', result.message);
        
        // Optionally store the token in localStorage or sessionStorage for future use
        localStorage.setItem('token', result.token);

        // Redirect to the dashboard or homepage
        navigate('/'); // Correct usage in React Router v6
      } else {
        console.error('Login failed: Invalid credentials or server error');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
        <div className="mt-4 text-center">
          <Button variant="outline"
            onClick={() => setRedirectTo('/register')}
            className="text-blue-600 hover:underline border-none shadow-none"
          >
            Don't have an account? Register
          </Button>
        </div>
        <div className="mt-2 text-center">
          <Button variant="outline"
            onClick={() => setRedirectTo('/admin')}
            className="text-green-600 hover:underline border-none shadow-none"
          >
            Admin Login
          </Button>
        </div>
      </div>
    </div>
  );
}
