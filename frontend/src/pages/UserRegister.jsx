import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import toast from 'react-hot-toast';

// API call to register user
const registerUser = async (userData) => {
  const formData = new FormData();
  for (const key in userData) {
    formData.append(key, userData[key]);
  }
  const response = await fetch('http://localhost:3000/user/register', {
    method: 'POST',
    body: formData,
  });
  
  // Check if the response is ok (status 200-299)
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  
  return response.json();
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    drivingLicense: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'drivingLicense' && files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(formData);
      if (result && result.token) {
        // Store the token in localStorage
        localStorage.setItem('token', result.token);
        // Navigate to the root route
        navigate('/');
      } else {
        console.error('Registration failed:', result.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Male" id="Male" />
                <Label htmlFor="Male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Female" id="Female" />
                <Label htmlFor="Female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Others" id="Others" />
                <Label htmlFor="Others">Other</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="drivingLicense">Driving License Image</Label>
            <Input
              id="drivingLicense"
              name="drivingLicense"
              type="file"
              onChange={handleInputChange}
              accept="image/*"
              required
            />
          </div>
          <Button type="submit" className="w-full">Register</Button>
        </form>
        <div className="mt-4 text-center">
          <Button variant="outline"
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline border-none shadow-none"
          >
            Already have an account? Login
          </Button>
        </div>
      </div>
    </div>
  );
}
