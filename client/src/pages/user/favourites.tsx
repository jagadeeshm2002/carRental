import { useState, useEffect } from "react";
import { Client } from "@/api/client";
import { useGlobalContext } from "@/context";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const FALLBACK_IMAGE = "https://placehold.co/600x400?text=No+Image";

interface ICar {
  _id: string;
  modelName: string;
  year: number;
  type: string;
  distance: string;
  originalPrice: number;
  discountedPrice: number;
  imageUrl: string[];
  location: string;
  category: string;
}

const Favourites = () => {
  const [favourites, setFavourites] = useState<ICar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useGlobalContext();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchFavourites = async () => {
      try {
        setIsLoading(true);
        // Changed endpoint from 'favourites' to 'favorites' to match server spelling
        const response = await Client.get(`/users/${user?.id}/favorites`, {
          signal: abortController.signal
        });

        // Check if response.data exists and has the expected format
        if (response.data && Array.isArray(response.data.cars)) {
          setFavourites(response.data.cars);
        } else if (response.data && Array.isArray(response.data)) {
          setFavourites(response.data);
        } else {
          // Handle unexpected response format
          console.error('Unexpected response format:', response.data);
          setFavourites([]);
          toast.error("Received invalid data format from server");
        }
      } catch (error: any) {
        if (error.name !== 'CanceledError') {
          console.error('Error fetching favorites:', error);
          const errorMessage = error.response?.data?.message || "Failed to fetch favourites";
          toast.error(errorMessage);
          setFavourites([]); // Ensure we set an empty array on error
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchFavourites();
    } else {
      setIsLoading(false); // Set loading to false if no user ID
    }

    return () => {
      abortController.abort();
    };
  }, [user?.id]);

  const removeFavourite = async (carId: string) => {
    try {
      if (!user?.id) {
        toast.error("You must be logged in to remove favorites");
        return;
      }

      // Changed endpoint from 'favourites' to 'favorites' to match server spelling
      await Client.delete(`/users/${user.id}/favorites/${carId}`);
      setFavourites(prev => prev.filter(car => car._id !== carId));
      toast.success("Removed from favourites");
    } catch (error: any) {
      console.error('Error removing favorite:', error);
      const errorMessage = error.response?.data?.message || "Failed to remove from favourites";
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
      <h2 className="text-2xl font-bold mb-6">My Favourites</h2>

      {favourites.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No favourites yet</h3>
          <p className="mt-1 text-sm text-gray-500">Start adding cars to your favourites.</p>
          <div className="mt-6">
            <Link
              to="/search"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Browse Cars
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
            >
              {/* Car Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={car.imageUrl?.[0] || FALLBACK_IMAGE}
                  alt={car.modelName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = FALLBACK_IMAGE;
                    target.onerror = null;
                  }}
                />
                <button
                  onClick={() => removeFavourite(car._id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-red-50 transition-colors"
                >
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                </button>
              </div>

              {/* Car Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {car.modelName}
                  </h3>
                  <span className="text-sm text-gray-500">{car.year}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-600">
                    {car.type}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-600">
                    {car.category}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-600">
                    {car.distance}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 line-through">
                      ${car.originalPrice}/day
                    </p>
                    <p className="text-lg font-semibold text-blue-600">
                      ${car.discountedPrice}/day
                    </p>
                  </div>
                  <Link
                    to={`/cars/${car._id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>

                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {car.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
