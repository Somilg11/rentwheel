import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";  // Ensure Input is imported
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router-dom";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    pickupDateTime: '',
    dropDateTime: '',
    carType: {
      name: '',
      seatCapacity: 0,
      transmission: '',
      price: 0
    }
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get location to access passed data

  // Check for JWT token in local storage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please log in to rent a vehicle.");
      navigate('/login');
    }
    
    // If there is state data, set it in formData
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        carType: {
          name: location.state.name || '',
          seatCapacity: location.state.seatCapacity || 0,
          transmission: location.state.transmission || '',
          price: location.state.price || 0
        }
      }));
    }
  }, [navigate, location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // eslint-disable-next-line no-unused-vars
  const handleCarTypeChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      carType: { ...prev.carType, [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await fetch('http://localhost:3000/booking/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                userId: localStorage.getItem('userId'), // Ensure this is correct
                pickupLocation: formData.pickupLocation,
                dropLocation: formData.dropLocation,
                pickupDateTime: formData.pickupDateTime,
                dropDateTime: formData.dropDateTime,
                name: formData.carType.model, // Assuming 'model' is used as the name in the vehicle table
                price: formData.carType.price,
                seatCapacity: formData.carType.seatCapacity
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create booking');
        }

        // eslint-disable-next-line no-unused-vars
        const result = await response.json();
        toast.success("Your booking has been successfully created.");
    } catch (error) {
        console.error('Booking creation error:', error);
        toast.error("Failed to create booking. Please try again.");
    } finally {
        setLoading(false);
    }
};



  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6">Create a New Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickupLocation">Pickup Location</Label>
            <Input
              id="pickupLocation"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dropLocation">Drop Location</Label>
            <Input
              id="dropLocation"
              name="dropLocation"
              value={formData.dropLocation}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
            <Label htmlFor="dropDateTime">Drop Date & Time</Label>
            <Input
              id="dropDateTime"
              name="dropDateTime"
              type="datetime-local"
              value={formData.dropDateTime}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Car Type</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Car Name</Label>
              <div className="border p-2 rounded bg-gray-100">
                {formData.carType.name} {/* Display the vehicle name here */}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="seatCapacity">Seat Capacity</Label>
              <div className="border p-2 rounded bg-gray-100">
                {formData.carType.seatCapacity} {/* Display seat capacity here */}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <div className="border p-2 rounded bg-gray-100">
                ${formData.carType.price} {/* Display price here */}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission</Label>
              <Select 
                onValueChange={(value) => setFormData(prev => ({
                  ...prev,
                  carType: { ...prev.carType, transmission: value }
                }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AUTO">Automatic</SelectItem>
                  <SelectItem value="MANUAL">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating Booking...' : 'Create Booking'}
        </Button>
      </form>
    </div>
  );
}
