import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// This is a placeholder function. Replace it with your actual API call.
const registerUser = async (userData) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('User registered:', userData);
  // In a real app, you'd make an API call here and handle the response
  return { success: true };
};

export default function RegisterPage() {
  const router = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: null,
    gender: '',
    drivingLicense: null,
  });
  
  const [redirectTo, setRedirectTo] = useState(null); // State to handle redirects

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'drivingLicense' && files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, dateOfBirth: date || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(formData);
      if (result.success) {
        router.push('/login'); // Redirect to login page after successful registration
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  // Handle redirects for the links
  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-40 pb-40">
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
            <Label htmlFor="pickupDateTime">Pickup Date & Time</Label>
            <Input
              id="pickupDateTime"
              name="pickupDateTime"
              type="datetime-local"
              value={formData.pickupDateTime}
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
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
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
          <Button variant = "outline"
            onClick={() => setRedirectTo('/login')}
            className="text-blue-600 hover:underline border-none shadow-none"
          >
            Already have an account? Login
          </Button>
        </div>
        
      </div>
    </div>
  );
}
