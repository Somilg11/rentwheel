import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Car,
  ClipboardList,
  Contact,
  Menu,
  Search,
} from "lucide-react"
import VehiclesSection from "./VehiclesSection"
import RentalLogsSection from "./RentalLogsSection"
import ContactInquiriesSection from "./ContactInquiriesSection"
import NewsletterSubscriptionsSection from "./NewsletterSubscriptionsSection"
import OrdersSection from "./OrdersSection"
import { apiService } from "@/lib/apiService"

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [dashboardStats, setDashboardStats] = useState({
    totalVehicles: 0,
    totalSubscribers: 0,
    totalOrders: 0,// Ensure this is set to 0 initially
  });
  

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const stats = await apiService.getDashboardStats();
        console.log("Fetched dashboard stats:", stats); // Log the stats
        setDashboardStats(stats);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };
  
    fetchDashboardStats();
  }, []);
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-center border-b px-6">
            <h2 className="text-2xl font-semibold">Admin Panel</h2>
          </div>
          <nav className="flex-1 space-y-2 p-6">
            <Button variant="ghost" className="w-full justify-start">
              <Car className="mr-2 h-4 w-4" />
              Vehicles
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ClipboardList className="mr-2 h-4 w-4" />
              Rental Logs
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Contact className="mr-2 h-4 w-4" />
              Contact Inquiries
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Mail className="mr-2 h-4 w-4" />
              Newsletter Subscriptions
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Package className="mr-2 h-4 w-4" />
              Orders
            </Button>
          </nav>
        </div>
      </aside> */}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-20 items-center justify-between border-b bg-white px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-4">
            <Input type="search" placeholder="Search..." className="w-64" />
            <Button size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="mb-6 text-3xl font-semibold">Dashboard</h1>

          {/* Overview Cards */}
          <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalVehicles}</div>
                <p className="text-xs text-muted-foreground">+5 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.activeRentals}</div>
                <p className="text-xs text-muted-foreground">+12% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
                <Contact className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.newInquiries}</div>
                <p className="text-xs text-muted-foreground">+7 since yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboardStats.totalRevenue}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="vehicles" className="space-y-4">
            <TabsList>
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger value="rental-logs">Rental Logs</TabsTrigger>
              <TabsTrigger value="contact">Contact Inquiries</TabsTrigger>
              <TabsTrigger value="newsletter">Newsletter Subscriptions</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="vehicles">
              <VehiclesSection />
            </TabsContent>
            <TabsContent value="rental-logs">
              <RentalLogsSection />
            </TabsContent>
            <TabsContent value="contact">
              <ContactInquiriesSection />
            </TabsContent>
            <TabsContent value="newsletter">
              <NewsletterSubscriptionsSection />
            </TabsContent>
            <TabsContent value="orders">
              <OrdersSection />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}