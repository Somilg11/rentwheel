import { useState } from 'react';

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]); // Fetch from API

  const handleAddVehicle = (vehicle) => {
    // Add vehicle logic (POST to API)
  };

  const handleUpdateVehicle = (id, updatedVehicle) => {
    // Update vehicle logic (PUT/PATCH to API)
  };

  const handleDeleteVehicle = (id) => {
    // Delete vehicle logic (DELETE from API)
  };

  return (
    <div>
      <h2>Manage Vehicles</h2>
      <button onClick={() => /* Show add vehicle form */}>Add Vehicle</button>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle.id}>
            {vehicle.name} - {vehicle.model} - ${vehicle.price}
            <button onClick={() => /* Show edit vehicle form */}>Edit</button>
            <button onClick={() => handleDeleteVehicle(vehicle.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageVehicles;
