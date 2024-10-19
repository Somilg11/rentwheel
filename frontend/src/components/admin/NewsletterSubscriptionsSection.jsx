import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Mail, UserPlus, UserMinus, BarChart2 } from "lucide-react";
import { apiService } from "@/lib/apiService";

export default function NewsletterSubscriptionsSection() {
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    activeSubscribers: 0,
    unsubscribedCount: 0,
    subscriptionsByMonth: [],
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSubscriberEmail, setNewSubscriberEmail] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSubscribers();
    fetchSubscriberStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm]);

  const fetchSubscribers = async () => {
    try {
      const response = await apiService.getNewsletterSubscribers(page, searchTerm);
      setSubscribers(response.subscribers);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    }
  };

  const fetchSubscriberStats = async () => {
    try {
      const stats = await apiService.getSubscriberStats();
      setStats(stats);
    } catch (error) {
      console.error("Failed to fetch subscriber stats:", error);
    }
  };

  const handleAddSubscriber = async () => {
    try {
      await apiService.addSubscriber(newSubscriberEmail);
      setIsAddDialogOpen(false);
      setNewSubscriberEmail("");
      fetchSubscribers();
      fetchSubscriberStats();
    } catch (error) {
      console.error("Failed to add subscriber:", error);
    }
  };

  const handleToggleSubscription = async (id, currentStatus) => {
    try {
      await apiService.updateSubscriberStatus(id, currentStatus === "active" ? "unsubscribed" : "active");
      fetchSubscribers();
      fetchSubscriberStats();
    } catch (error) {
      console.error("Failed to update subscriber status:", error);
    }
  };

  const pieChartData = [
    { name: "Active", value: stats.activeSubscribers },
    { name: "Unsubscribed", value: stats.unsubscribedCount },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Newsletter Subscriptions</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add Subscriber
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subscriber</DialogTitle>
              <DialogDescription>Enter the email address of the new subscriber.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={newSubscriberEmail}
                  onChange={(e) => setNewSubscriberEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddSubscriber}>Add Subscriber</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubscribers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSubscribers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unsubscribed</CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unsubscribedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscription Rate</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((stats.activeSubscribers / stats.totalSubscribers) * 100).toFixed(2)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Subscriber List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <div className="flex justify-between items-center">
            <Input
              type="search"
              placeholder="Search subscribers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscribed Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell>{subscriber.email}</TableCell>
                  <TableCell>
                    <Badge variant={subscriber.status === "active" ? "default" : "secondary"}>
                      {subscriber.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(subscriber.subscribedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      onClick={() => handleToggleSubscription(subscriber.id, subscriber.status)}
                    >
                      {subscriber.status === "active" ? "Unsubscribe" : "Resubscribe"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center">
            <Button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
              Previous
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
              Next
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subscriber Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Subscriptions by Month</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.subscriptionsByMonth}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
