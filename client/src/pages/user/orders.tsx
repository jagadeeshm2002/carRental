import { useState, useEffect } from "react";
import { Client } from "@/api/client";
import { useGlobalContext } from "@/context";
import { toast } from "sonner";

interface Order {
  _id: string;
  car: {
    modelName: string;
    imageUrl: string[];
    type: string;
    category: string;
  };
  pickupDate: Date;
  returnDate: Date;
  totalDays: number;
  totalAmount: number;
  orderStatus: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: Date;
}

const FALLBACK_IMAGE = "";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useGlobalContext();

  useEffect(() => {
    // Create an AbortController instance
    const abortController = new AbortController();

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await Client.get(`/order/user/${user?.id}`, {
          signal: abortController.signal, // Pass the signal to the request
        });
        setOrders(response.data);
      } catch (error: any) {
        // Only show error if it's not an abort error
        if (error.name !== "CanceledError") {
          const errorMessage =
            error.response?.data?.message || "Failed to fetch orders";
          toast.error(errorMessage);
          console.error("Error fetching orders:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchOrders();
    }

    // Cleanup: abort any pending requests when component unmounts
    return () => {
      abortController.abort();
    };
  }, [user?.id]);

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      CONFIRMED: "bg-blue-100 text-blue-800",
      COMPLETED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
      {orders.length === 0 ? (
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
          <p className="mt-1 text-sm text-gray-500">Start by renting a car.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Car Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden">
                      <img
                        src={order.car?.imageUrl?.[0] || FALLBACK_IMAGE}
                        alt={order.car?.modelName || "Car"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = FALLBACK_IMAGE;
                          target.onerror = null; // Prevents infinite loop if fallback also fails
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {order.car.modelName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <span className="px-2 py-1 bg-gray-100 rounded-md">
                          {order.car.type}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-md">
                          {order.car.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="flex flex-wrap gap-4 md:gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Pickup Date</p>
                      <p className="font-medium">
                        {formatDate(order.pickupDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Return Date</p>
                      <p className="font-medium">
                        {formatDate(order.returnDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{order.totalDays} days</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-medium">${order.totalAmount}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                    <p className="text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
