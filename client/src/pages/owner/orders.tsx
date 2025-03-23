import { useState, useEffect } from "react";
import { Client } from "@/api/client";
import { useGlobalContext } from "@/context";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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
  orderStatus: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

const FALLBACK_IMAGE = "";

const OwnerOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useGlobalContext();

  useEffect(() => {
    // const abortController = new AbortController();

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await Client.get(`/order/owner/${user?.id}`, {
          // signal: abortController.signal,
        });
        setOrders(response.data.data);
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
      // abortController.abort();
    };
  }, [user?.id]);

  const updateOrderStatus = async (
    orderId: string,
    status: Order["orderStatus"]
  ) => {
    try {
      const response = await Client.put(`/order/${orderId}`, {
        orderStatus: status,
      });
      if (response.status === 200) {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: status } : order
          )
        );
        toast.success(`Order ${status.toLowerCase()} successfully`);
      } else {
        throw new Error("Failed to update order status");
      }
    } catch (error: any) {
      console.error("Error updating order status:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update order status";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Orders Management</h2>
        <div className="grid gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <Skeleton className="w-20 h-20 rounded-lg" />
                  <div>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-48 mb-1" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Orders Management</h2>
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No orders yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Your orders will appear here once customers start booking.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Orders Management</h2>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-2xl shadow-sm p-6">
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
                  <h3 className="font-semibold text-lg">
                    {order.car.modelName}
                  </h3>
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
                  <span
                    className={`font-semibold ${
                      order.orderStatus === "confirmed"
                        ? "text-green-600"
                        : order.orderStatus === "cancelled"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {order.orderStatus === "pending" && (
                  <>
                    <Button
                      onClick={() => updateOrderStatus(order._id, "confirmed")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={() => updateOrderStatus(order._id, "cancelled")}
                      variant="destructive"
                    >
                      Reject
                    </Button>
                  </>
                )}
                {order.orderStatus === "confirmed" && (
                  <Button
                    onClick={() => updateOrderStatus(order._id, "confirmed")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Complete
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerOrders;
