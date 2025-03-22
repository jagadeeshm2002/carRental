import React, { useState, useEffect } from "react";
import { Client } from "@/api/client";
import { useGlobalContext } from "@/context";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Order {
  _id: string;
  car: {
    modelName: string;
    imageUrl: string[];
    type: string;
    category: string;
  };
  user: {
    name: string;
    email: string;
  };
  pickupDate: Date;
  returnDate: Date;
  totalDays: number;
  totalAmount: number;
  orderStatus: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: Date;
}

const FALLBACK_IMAGE = "";

const OwnerOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useGlobalContext();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await Client.get(`/orders/owner/${user?.id}`, {
          signal: abortController.signal,
        });
        setOrders(response.data);
      } catch (error: any) {
        if (error.name !== "CanceledError") {
          const errorMessage =
            error.response?.data?.message || "Failed to fetch orders";
          toast.error(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchOrders();
    }

    return () => {
      abortController.abort();
    };
  }, [user?.id]);

  const updateOrderStatus = async (orderId: string, status: Order["orderStatus"]) => {
    try {
      await Client.patch(`/orders/${orderId}/status`, { status });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, orderStatus: status } : order
      ));
      toast.success(`Order ${status.toLowerCase()} successfully`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update order status";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Orders Management</h2>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* Order Info */}
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <img
                    src={order.car?.imageUrl?.[0] || FALLBACK_IMAGE}
                    alt={order.car?.modelName || "Car"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = FALLBACK_IMAGE;
                      target.onerror = null;
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{order.car.modelName}</h3>
                  <p className="text-gray-600">Customer: {order.user.name}</p>
                  <p className="text-gray-600">Email: {order.user.email}</p>
                </div>
              </div>

              {/* Order Details */}
              <div className="flex flex-col gap-2">
                <div className="text-sm">
                  <span className="text-gray-600">Total Amount:</span>{" "}
                  <span className="font-semibold">${order.totalAmount}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Duration:</span>{" "}
                  <span className="font-semibold">{order.totalDays} days</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Status:</span>{" "}
                  <span className={`font-semibold ${
                    order.orderStatus === "CONFIRMED" ? "text-green-600" :
                    order.orderStatus === "CANCELLED" ? "text-red-600" :
                    "text-yellow-600"
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* Actions */}
              {order.orderStatus === "PENDING" && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => updateOrderStatus(order._id, "CONFIRMED")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Confirm
                  </Button>
                  <Button
                    onClick={() => updateOrderStatus(order._id, "CANCELLED")}
                    variant="destructive"
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerOrders; 