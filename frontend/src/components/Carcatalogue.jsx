import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Users, Fuel, Activity, GhostIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// Car data array
const cars = [
  {
    id: 1,
    name: "Toyota Camry",
    pricePerDay: 50,
    image: "./hero.png",
    transmission: "Automatic",
    seats: 5,
    fuelType: "Gasoline",
    condition: "Excellent"
  },
  {
    id: 2,
    name: "Honda Civic",
    pricePerDay: 45,
    image: "./hero.png",
    transmission: "Manual",
    seats: 5,
    fuelType: "Hybrid",
    condition: "Good"
  },
  {
    id: 3,
    name: "Ford Mustang",
    pricePerDay: 75,
    image: "./hero.png",
    transmission: "Automatic",
    seats: 4,
    fuelType: "Gasoline",
    condition: "Excellent"
  },
  {
    id: 4,
    name: "Tesla Model 3",
    pricePerDay: 90,
    image: "./hero.png",
    transmission: "Automatic",
    seats: 5,
    fuelType: "Electric",
    condition: "Excellent"
  },
];

export default function CarCatalogue() {
  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Car Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}

function CarCard({ car }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const goToBooking = () => {
    navigate('/booking');
  }
  return (
    <Card
      className="overflow-hidden transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">{car.name}</h3>
          <p className="text-lg font-bold text-primary">${car.pricePerDay}/day</p>
        </div>
        <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded-md mb-4" />
        {!isHovered && (
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-2">
                <Car className="w-4 h-4 text-primary" />
              </div>
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-2">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <span>{car.seats} seats</span>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-2">
                <Fuel className="w-4 h-4 text-primary" />
              </div>
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-2">
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <span>{car.condition}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4">
        {isHovered && (
          
          <Button className="w-full" onClick={goToBooking}>
            Rent Now
          </Button>
          
        )}
      </CardFooter>
    </Card>
  );
}
