import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from 'react-hot-toast';

// API call to login admin
const loginAdmin = async (credentials) => {
  const response = await fetch('http://localhost:3000/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  // Check if the response is okay
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
};

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginAdmin(credentials);
      if (result) {
        toast.success("Login successful");
        // Store the token in localStorage if your API returns one
        localStorage.setItem('adminToken', result.token); // Adjust according to your API response
        navigate('/admin/dashboard'); 
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error('Admin login failed:', error);
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
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
        
        <div className="mt-2 text-center">
          <Button variant="outline"
            onClick={() => navigate('/login')}
            className="text-green-600 hover:underline border-none shadow-none"
          >
            User Login
          </Button>
        </div>
      </div>
    </div>
  );
}
