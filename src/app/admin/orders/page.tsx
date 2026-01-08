"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { orderApi } from "@/lib/api";
import { authStorage } from "@/lib/auth";

interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  paymentStatus: string;
  deliveryType: string;
  createdAt: string;
  formattedDate?: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-purple-100 text-purple-700",
  ready: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_OPTIONS = ["pending", "confirmed", "preparing", "ready", "completed", "cancelled"];

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = authStorage.getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }
    setToken(token);
    fetchOrders(token);
  }, [router, filterStatus]);

  const fetchOrders = async (authToken: string) => {
    try {
      setLoading(true);
      const response = await orderApi.getAll(authToken, filterStatus || undefined);
      if (response.success && response.data) {
        const ordersWithFormattedDates = (response.data as Order[]).map((order: Order) => ({
          ...order,
          formattedDate: new Date(order.createdAt).toLocaleString(),
        }));
        setOrders(ordersWithFormattedDates);
      }
    } catch {
      console.error("Failed to fetch orders");
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    if (!token) return;

    try {
      const response = await orderApi.updateStatus(orderId, newStatus, token);
      if (response.success) {
        fetchOrders(token);
      } else {
        alert(response.error || "Failed to update order status");
      }
    } catch {
      alert("Failed to update order status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-diner-cream">
        <p className="text-diner-coffee">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-diner-cream py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-diner-coffee">Order Management</h1>
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-diner-coffee rounded-lg focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
            >
              <option value="">All Orders</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="px-4 py-2 border border-diner-coffee text-diner-coffee rounded-lg hover:bg-diner-coffee hover:text-diner-cream transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-diner p-6">
          {orders.length === 0 ? (
            <p className="text-center text-diner-coffee/70 py-12">No orders found</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <motion.div
                  key={order._id}
                  className="border border-diner-coffee/20 rounded-lg p-4 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-diner-coffee">
                          {order.orderNumber}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[order.status] || STATUS_COLORS.pending}`}>
                          {order.status}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${order.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                      <p className="text-diner-coffee/70 text-sm mb-2">
                        <strong>Customer:</strong> {order.customerName} ({order.customerEmail}) - {order.customerPhone}
                      </p>
                      <p className="text-diner-coffee/70 text-sm mb-2">
                        <strong>Type:</strong> {order.deliveryType} | <strong>Date:</strong>{" "}
                        {order.formattedDate}
                      </p>
                      <div className="mt-2">
                        <p className="text-sm font-medium text-diner-coffee mb-1">Items:</p>
                        <ul className="list-disc list-inside text-sm text-diner-coffee/70">
                          {order.items.map((item: OrderItem, idx: number) => (
                            <li key={idx}>
                              {item.quantity}x {item.name} - ${item.subtotal.toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="md:text-right">
                      <p className="text-lg font-semibold text-diner-coffee mb-2">
                        Total: <span className="text-diner-gold">${order.total.toFixed(2)}</span>
                      </p>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        className="px-3 py-1 border border-diner-coffee/20 rounded text-sm focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

