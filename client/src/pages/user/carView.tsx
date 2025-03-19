import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Truck,
  Check,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import CarBookingSheet from "./carBookingSheet";
import { CarDetails, Review } from "@/types/type";



const CarView: React.FC = () => {
  const id = window.location.pathname.split("/").pop();
  const navigate = useNavigate();
  const [car, setCar] = useState<CarDetails | null>(null);
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Calculate discount percentage
  const getDiscountPercentage = () => {
    if (!car) return 0;
    return Math.round(
      ((car.originalPrice - car.discountedPrice) / car.originalPrice) * 100
    );
  };

  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Image carousel navigation
  const nextImage = () => {
    if (!car) return;
    setCurrentImageIndex((prev) =>
      prev === car.imageUrl.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!car) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? car.imageUrl.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);

        setError(null);
        if (!id) {
          setError("Car ID not provided");
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `http://localhost:3000/api/v1/cars/${id}`
        );
        if (!response.data) {
          setError(response.data.error);
          setLoading(false);
          return;
        }
        setCar(response.data.car);
        setReviews(response.data.reviews);
        console.log(response.data);

        // For demonstration, using the static data passed in
        // In a real app, you would fetch from API: await fetch(`/api/v1/cars/${id}`)
        const mockData: CarDetails = {
          _id: "67cb21a5ab2c6fa19c1df6da",
          user: "67c9e2785f5b038fab4404f1",
          modelName: "Tesla Model 4",
          year: 2024,
          type: "sedan",
          distance: "10000 km",
          originalPrice: 45000,
          discountedPrice: 42500,
          duration: "48 months",
          imageUrl: [
            "https://example.com/car1.jpg",
            "https://example.com/car2.jpg",
          ],
          location: "San Francisco, CA",
          coordinates: {
            latitude: 37.7749,
            longitude: -122.4194,
          },
          features: [
            "Air Conditioning",
            "Bluetooth",
            "Navigation System",
            "Leather Seats",
          ],
          category: "electric",
          createdAt: "2025-03-07T16:41:09.399Z",
          updatedAt: "2025-03-07T17:52:23.686Z",
          __v: 0,
        };

        // setCar(mockData);
        setLoading(false);
      } catch (error) {
        setError("Failed to load car details");
        setLoading(false);
        console.log(error);
      }
    };

    fetchCarDetails();
  }, [id]);

  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Handle error state
  if (error || !car) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">{error || "Car not found"}</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <CarBookingSheet
        car={car}
        open={open}
        setOpen={setOpen}
      />

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-6 text-blue-600"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to search results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Images and basic details */}
        <div className="lg:col-span-2">
          {/* Image carousel */}
          <div className="relative bg-gray-100 rounded-lg mb-6 aspect-video overflow-hidden">
            {/* Placeholder while images load */}
            <img
              src={
                car.imageUrl[currentImageIndex] || "/api/placeholder/800/450"
              }
              alt={car.modelName}
              className="w-full h-full object-cover"
            />

            {/* Navigation arrows */}
            {car.imageUrl.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {car.imageUrl.length}
                </div>
              </>
            )}
          </div>

          {/* Car title and basic info */}
          <h1 className="text-3xl font-bold mb-2">
            {car.year} {car.modelName}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{car.location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center">
              <Truck className="w-4 h-4 mr-1" />
              <span>{car.distance}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              <span>{reviews.length > 0 ? "4.8/5" : "No reviews yet"}</span>
            </div>
          </div>

          {/* Car features */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Car description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">
              The {car.year} {car.modelName} is a premium {car.type} vehicle
              with excellent fuel efficiency and modern features. This{" "}
              {car.category} car has been driven for {car.distance} and is
              available for a {car.duration} lease term.
            </p>
          </div>

          {/* Reviews section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {/* Review items would go here */}
                <p className="text-gray-700">No reviews to display.</p>
              </div>
            ) : (
              <p className="text-gray-700">No reviews yet for this vehicle.</p>
            )}
          </div>
        </div>

        {/* Right column: Pricing and booking */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            {/* Price information */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Original Price</span>
                <span className="text-gray-500 line-through">
                  ${formatPrice(car.originalPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Discounted Price</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${formatPrice(car.discountedPrice)}
                </span>
              </div>
              {getDiscountPercentage() > 0 && (
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm inline-block">
                  Save {getDiscountPercentage()}%
                </div>
              )}
            </div>

            {/* Lease details */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Lease Details</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Duration</span>
                <span>{car.duration}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Monthly Payment</span>
                <span>
                  $
                  {formatPrice(
                    Math.round(car.discountedPrice / parseInt(car.duration))
                  )}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition" onClick={() => setOpen(true)}>
                Book Now
              </button>
              <button className="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-lg transition">
                Contact Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarView;
