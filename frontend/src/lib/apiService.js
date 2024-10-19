import axios from 'axios';

// Simulated API delay for mock data
const apiDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Data
const demoVehicles = [
  { id: '1', name: 'Toyota Camry', type: 'sedan', status: 'available' },
  { id: '2', name: 'Honda CR-V', type: 'SUV', status: 'rented' },
];
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
    const newVehicle = { ...vehicle, id: String(demoVehicles.length + 1) };
    demoVehicles.push(newVehicle); // Simulating adding vehicle to mock data
    return newVehicle;
  },

  async updateVehicle(id, vehicle) {
    await apiDelay(500);
    const index = demoVehicles.findIndex(v => v.id === id);
    if (index === -1) throw new Error('Vehicle not found');
    demoVehicles[index] = { ...demoVehicles[index], ...vehicle }; // Simulating vehicle update
    return demoVehicles[index];
  },

  async deleteVehicle(id) {
    await apiDelay(500);
    const index = demoVehicles.findIndex(v => v.id === id);
    if (index === -1) throw new Error('Vehicle not found');
    demoVehicles.splice(index, 1); // Simulating deletion of a vehicle from mock data
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
