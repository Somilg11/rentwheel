// Demo data
const demoVehicles = [
    { id: '1', name: 'Toyota Camry', type: 'Sedan', status: 'available' },
    { id: '2', name: 'Honda CR-V', type: 'SUV', status: 'rented' },
    { id: '3', name: 'Ford F-150', type: 'Truck', status: 'maintenance' },
  ];
  
  const demoSubscribers = [
    { id: '1', email: 'john@example.com', status: 'active', subscribedDate: '2023-01-15' },
    { id: '2', email: 'jane@example.com', status: 'unsubscribed', subscribedDate: '2023-02-20' },
  ];
  
  const demoOrders = [
    { id: '1', customerName: 'Alice Johnson', vehicleName: 'Toyota Camry', startDate: '2023-06-01', endDate: '2023-06-07', totalAmount: 420, status: 'completed' },
    { id: '2', customerName: 'Bob Smith', vehicleName: 'Honda CR-V', startDate: '2023-06-10', endDate: '2023-06-15', totalAmount: 375, status: 'active' },
  ];
  
  // Simulated API delay
  const apiDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  const API_BASE_URL = 'https://api.example.com';
  
  export const apiService = {
    async getDashboardStats() {
      await apiDelay(500);
      return {
        totalVehicles: demoVehicles.length,
        totalSubscribers: demoSubscribers.length,
        totalOrders: demoOrders.length,
      };
    },
  
    async getVehicles(page, searchTerm) {
      await apiDelay(500);
      const filteredVehicles = demoVehicles.filter(v =>
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
      demoVehicles.push(newVehicle);
      return newVehicle;
    },
  
    async updateVehicle(id, vehicle) {
      await apiDelay(500);
      const index = demoVehicles.findIndex(v => v.id === id);
      if (index === -1) throw new Error('Vehicle not found');
      demoVehicles[index] = { ...demoVehicles[index], ...vehicle };
      return demoVehicles[index];
    },
  
    async deleteVehicle(id) {
      await apiDelay(500);
      const index = demoVehicles.findIndex(v => v.id === id);
      if (index === -1) throw new Error('Vehicle not found');
      demoVehicles.splice(index, 1);
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
  
    async addSubscriber(email) {
      await apiDelay(500);
      const newSubscriber = {
        id: String(demoSubscribers.length + 1),
        email,
        status: 'active',
        subscribedDate: new Date().toISOString().split('T')[0],
      };
      demoSubscribers.push(newSubscriber);
      return newSubscriber;
    },
  
    async updateSubscriberStatus(id, status) {
      await apiDelay(500);
      const index = demoSubscribers.findIndex(s => s.id === id);
      if (index === -1) throw new Error('Subscriber not found');
      demoSubscribers[index] = { ...demoSubscribers[index], status };
      return demoSubscribers[index];
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
  