import axios from 'axios';

// Simulated API delay for mock data
const apiDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Data
const demoSubscribers = [
  { id: '1', email: 'john@example.com', status: 'active', subscribedDate: '2023-01-15' },
  { id: '2', email: 'jane@example.com', status: 'unsubscribed', subscribedDate: '2023-02-20' },
];
const demoOrders = [
  { id: '1', customerName: 'Alice Johnson', vehicleName: 'Toyota Camry', startDate: '2023-06-01', endDate: '2023-06-07', totalAmount: 420, status: 'completed' },
  { id: '2', customerName: 'Bob Smith', vehicleName: 'Honda CR-V', startDate: '2023-06-10', endDate: '2023-06-15', totalAmount: 375, status: 'active' },
];

// Function to fetch vehicles from the API
async function fetchVehiclesFromAPI() {
  try {
    const response = await axios.get('http://localhost:3000/admin/vehicles');
    return response.data.vehicles; // Assuming the API returns an array of vehicles
  } catch (error) {
    console.error('Failed to fetch vehicles:', error);
    throw new Error('Failed to fetch vehicles');
  }
}

// API service object for all functionalities
export const apiService = {
  async getDashboardStats() {
    await apiDelay(500);
    const vehicles = await fetchVehiclesFromAPI(); // Fetch vehicles using axios
    return {
      totalVehicles: vehicles.length, // Replace mock data with fetched data
      totalSubscribers: demoSubscribers.length,
      totalOrders: demoOrders.length,
    };
  },

  async getVehicles(page, searchTerm) {
    await apiDelay(500);
    const vehicles = await fetchVehiclesFromAPI(); // Fetch vehicles using axios
    const filteredVehicles = vehicles.filter(v =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      vehicles: filteredVehicles.slice((page - 1) * 10, page * 10),
      totalPages: Math.ceil(filteredVehicles.length / 10),
    };
  },

  async addVehicle(vehicle) {
    await apiDelay(500);
    const response = await axios.post('http://localhost:3000/admin/vehicles', vehicle);
    return response.data.vehicle; // Assuming the backend returns the created vehicle
  },

  async updateVehicle(id, vehicle) {
    try {
      // Convert the 'seats' field to an integer if it's provided
      if (vehicle.seats) {
        vehicle.seats = parseInt(vehicle.seats, 10); // Ensure 'seats' is a number
      }
  
      // Perform a PUT request to the backend to update the vehicle details
      const response = await axios.put(`http://localhost:3000/admin/vehicles/${id}`, vehicle);
  
      // Return the updated vehicle from the response
      return response.data.vehicle;
    } catch (error) {
      console.error('Error updating vehicle:', error);
      throw new Error(error.response?.data?.message || 'Error updating vehicle');
    }
  },
  

  async deleteVehicle(id) {
    try {
      // Perform a DELETE request to the backend to delete the vehicle
      const response = await axios.delete(`http://localhost:3000/admin/vehicles/${id}`);
  
      // Return the confirmation message or deleted vehicle from the response
      return response.data.message;
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      throw new Error(error.response?.data?.message || 'Error deleting vehicle');
    }
  },

  async getNewsletterSubscribers(page, searchTerm) {
    await apiDelay(500);
    const filteredSubscribers = demoSubscribers.filter(s =>
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      subscribers: filteredSubscribers.slice((page - 1) * 10, page * 10),
      totalPages: Math.ceil(filteredSubscribers.length / 10),
    };
  },

  async getSubscriberStats() {
    await apiDelay(500);
    return {
      totalSubscribers: demoSubscribers.length,
      activeSubscribers: demoSubscribers.filter(s => s.status === 'active').length,
      unsubscribedCount: demoSubscribers.filter(s => s.status === 'unsubscribed').length,
    };
  },

  async getOrders(page, searchTerm, statusFilter) {
    await apiDelay(500);
    let filteredOrders = demoOrders.filter(o =>
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.vehicleName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (statusFilter !== 'all') {
      filteredOrders = filteredOrders.filter(o => o.status === statusFilter);
    }
    return {
      orders: filteredOrders.slice((page - 1) * 10, page * 10),
      totalPages: Math.ceil(filteredOrders.length / 10),
    };
  },

  async getOrderStats() {
    await apiDelay(500);
    const totalOrders = demoOrders.length;
    const totalRevenue = demoOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const averageOrderValue = totalRevenue / totalOrders;
    const ordersByStatus = [
      { status: 'pending', count: demoOrders.filter(o => o.status === 'pending').length },
      { status: 'active', count: demoOrders.filter(o => o.status === 'active').length },
      { status: 'completed', count: demoOrders.filter(o => o.status === 'completed').length },
      { status: 'cancelled', count: demoOrders.filter(o => o.status === 'cancelled').length },
    ];
    const revenueByMonth = [
      { month: 'Jan', revenue: 1000 },
      { month: 'Feb', revenue: 1200 },
      { month: 'Mar', revenue: 1500 },
      { month: 'Apr', revenue: 1300 },
      { month: 'May', revenue: 1700 },
      { month: 'Jun', revenue: 2000 },
    ];
    return { totalOrders, totalRevenue, averageOrderValue, ordersByStatus, revenueByMonth };
  },

  async updateOrderStatus(orderId, newStatus) {
    await apiDelay(500);
    const index = demoOrders.findIndex(o => o.id === orderId);
    if (index === -1) throw new Error('Order not found');
    demoOrders[index] = { ...demoOrders[index], status: newStatus };
    return demoOrders[index];
  },
};
