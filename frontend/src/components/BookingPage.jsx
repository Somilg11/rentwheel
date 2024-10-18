import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'react-hot-toast' // Import from react-hot-toast

export default function BookingPage() {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    pickupDateTime: '',
    dropDateTime: '',
    carType: {
      brand: '',
      model: '',
      seatCapacity: 0,
      transmission: ''
    }
  })
  
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCarTypeChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      carType: { ...prev.carType, [name]: value }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: 1, // Assuming a user is logged in, replace with actual user ID
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create booking')
      }

      const data = await response.json()
      toast.success("Your booking has been successfully created.") // Success toast
    } catch (error) {
      console.error('Booking creation error:', error)
      toast.error("Failed to create booking. Please try again.") // Error toast
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-44">
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
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                name="brand"
                value={formData.carType.brand}
                onChange={handleCarTypeChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                name="model"
                value={formData.carType.model}
                onChange={handleCarTypeChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="seatCapacity">Seat Capacity</Label>
              <Input
                id="seatCapacity"
                name="seatCapacity"
                type="number"
                value={formData.carType.seatCapacity}
                onChange={handleCarTypeChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission</Label>
              <Select 
                onValueChange={(value) => setFormData(prev => ({
                  ...prev,
                  carType: { ...prev.carType, transmission: value }
                }))}
              >
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
  )
}
