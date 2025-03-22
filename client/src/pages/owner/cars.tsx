import React, { useState } from "react";
import { Map } from "lucide-react";

// Define enums/types that match your schema
const Type = {
  SEDAN: "Sedan",
  SUV: "SUV",
  TRUCK: "Truck",
  COUPE: "Coupe",
  HATCHBACK: "Hatchback",
  CONVERTIBLE: "Convertible",
  VAN: "Van",
};

const Duration = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
};

const Features = {
  NAVIGATION: "GPS Navigation",
  BLUETOOTH: "Bluetooth",
  SUNROOF: "Sunroof",
  LEATHER_SEATS: "Leather Seats",
  BACKUP_CAMERA: "Backup Camera",
  HEATED_SEATS: "Heated Seats",
  CRUISE_CONTROL: "Cruise Control",
  KEYLESS_ENTRY: "Keyless Entry",
};

const Category = {
  ECONOMY: "Economy",
  LUXURY: "Luxury",
  SPORT: "Sport",
  FAMILY: "Family",
  OFFROAD: "Off-Road",
};

const CarDashboard = () => {
  // Sample data based on your schema
  const [cars, setCars] = useState([
    {
      _id: "507f1f77bcf86cd799439011", // Mocking ObjectId
      modelName: "Toyota Camry",
      year: 2020,
      type: Type.SEDAN,
      distance: "35,000 miles",
      originalPrice: 26500,
      discountedPrice: 22000,
      coupon: "SUMMER25",
      duration: Duration.WEEKLY,
      imageUrl: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      location: "San Francisco, CA",
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
      features: [
        Features.BLUETOOTH,
        Features.BACKUP_CAMERA,
        Features.CRUISE_CONTROL,
      ],
      category: Category.ECONOMY,
      isEditing: false,
    },
    {
      _id: "507f1f77bcf86cd799439012",
      modelName: "Honda CR-V",
      year: 2021,
      type: Type.SUV,
      distance: "15,000 miles",
      originalPrice: 32000,
      discountedPrice: 29500,
      coupon: "FALL15",
      duration: Duration.MONTHLY,
      imageUrl: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      location: "Los Angeles, CA",
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437,
      },
      features: [
        Features.NAVIGATION,
        Features.LEATHER_SEATS,
        Features.SUNROOF,
        Features.HEATED_SEATS,
      ],
      category: Category.FAMILY,
      isEditing: false,
    },
    {
      _id: "507f1f77bcf86cd799439013",
      modelName: "Ford Mustang",
      year: 2022,
      type: Type.COUPE,
      distance: "5,000 miles",
      originalPrice: 45000,
      discountedPrice: 42500,
      coupon: "SPORTS10",
      duration: Duration.DAILY,
      imageUrl: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      location: "Miami, FL",
      coordinates: {
        latitude: 25.7617,
        longitude: -80.1918,
      },
      features: [
        Features.NAVIGATION,
        Features.BLUETOOTH,
        Features.LEATHER_SEATS,
        Features.KEYLESS_ENTRY,
      ],
      category: Category.SPORT,
      isEditing: false,
    },
  ]);

  // Toggle edit mode for a car
  const toggleEdit = (id: string) => {
    setCars(
      cars.map((car) =>
        car._id === id ? { ...car, isEditing: !car.isEditing } : car
      )
    );
  };

  // Handle input changes
  const handleChange = (id: string, field, value) => {
    setCars(
      cars.map((car) => (car._id === id ? { ...car, [field]: value } : car))
    );
  };

  // Handle nested object changes (like coordinates)
  const handleNestedChange = (id, parent, field, value) => {
    setCars(
      cars.map((car) =>
        car._id === id
          ? {
              ...car,
              [parent]: {
                ...car[parent],
                [field]: value,
              },
            }
          : car
      )
    );
  };

  // Handle array changes for features
  const handleFeatureToggle = (id, feature) => {
    setCars(
      cars.map((car) => {
        if (car._id === id) {
          const features = [...car.features];
          if (features.includes(feature)) {
            return { ...car, features: features.filter((f) => f !== feature) };
          } else {
            return { ...car, features: [...features, feature] };
          }
        }
        return car;
      })
    );
  };

  // Save changes
  const saveChanges = (id) => {
    // In a real app, you would submit changes to an API here
    toggleEdit(id);
  };

  // Calculate savings percentage
  const calculateSavings = (original: number, discounted: number) => {
    if (!original || !discounted) return 0;
    return Math.round(((original - discounted) / original) * 100);
  };

  return (
    <div className="bg-blue-50 min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-800">My Car Listings</h1>
          <p className="text-blue-600">Manage and edit your vehicle listings</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {/* Car Image Header */}
              <div className="h-48 bg-blue-100 relative">
                <img
                  src={car.imageUrl[0]}
                  alt={car.modelName}
                  className="w-full h-full object-cover"
                />
                {!car.isEditing &&
                  calculateSavings(car.originalPrice, car.discountedPrice) >
                    0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {calculateSavings(car.originalPrice, car.discountedPrice)}
                      % OFF
                    </div>
                  )}
              </div>

              {/* Car Details */}
              <div className="p-6">
                {!car.isEditing ? (
                  // View Mode
                  <>
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold text-blue-900">
                        {car.year} {car.modelName}
                      </h2>
                      <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        {car.category}
                      </div>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <Map size={16} className="mr-1" />
                      <span>{car.location}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 mb-4 text-sm">
                      <div className="text-gray-600">
                        <span className="font-medium">Type:</span> {car.type}
                      </div>
                      <div className="text-gray-600">
                        <span className="font-medium">Mileage:</span>{" "}
                        {car.distance}
                      </div>
                      <div className="text-gray-600">
                        <span className="font-medium">Duration:</span>{" "}
                        {car.duration}
                      </div>
                      {car.coupon && (
                        <div className="text-gray-600">
                          <span className="font-medium">Coupon:</span>{" "}
                          {car.coupon}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex items-baseline mb-1">
                        <span className="text-xl font-bold text-blue-800">
                          ${car.discountedPrice.toLocaleString()}
                        </span>
                        {car.originalPrice > car.discountedPrice && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ${car.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {car.features.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                          Features:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {car.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => toggleEdit(car._id)}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Edit Details
                    </button>
                  </>
                ) : (
                  // Edit Mode
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-blue-900 mb-2">
                      Edit Car Details
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Model Name
                        </label>
                        <input
                          type="text"
                          value={car.modelName}
                          onChange={(e) =>
                            handleChange(car._id, "modelName", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Year
                        </label>
                        <input
                          type="number"
                          value={car.year}
                          onChange={(e) =>
                            handleChange(
                              car._id,
                              "year",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type
                        </label>
                        <select
                          value={car.type}
                          onChange={(e) =>
                            handleChange(car._id, "type", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          {Object.values(Type).map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          value={car.category}
                          onChange={(e) =>
                            handleChange(car._id, "category", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          {Object.values(Category).map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Distance/Mileage
                      </label>
                      <input
                        type="text"
                        value={car.distance}
                        onChange={(e) =>
                          handleChange(car._id, "distance", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Original Price ($)
                        </label>
                        <input
                          type="number"
                          value={car.originalPrice}
                          onChange={(e) =>
                            handleChange(
                              car._id,
                              "originalPrice",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Discounted Price ($)
                        </label>
                        <input
                          type="number"
                          value={car.discountedPrice}
                          onChange={(e) =>
                            handleChange(
                              car._id,
                              "discountedPrice",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Coupon Code
                        </label>
                        <input
                          type="text"
                          value={car.coupon}
                          onChange={(e) =>
                            handleChange(car._id, "coupon", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration
                        </label>
                        <select
                          value={car.duration}
                          onChange={(e) =>
                            handleChange(car._id, "duration", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          {Object.values(Duration).map((duration) => (
                            <option key={duration} value={duration}>
                              {duration}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={car.location}
                        onChange={(e) =>
                          handleChange(car._id, "location", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Latitude
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          value={car.coordinates.latitude}
                          onChange={(e) =>
                            handleNestedChange(
                              car._id,
                              "coordinates",
                              "latitude",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Longitude
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          value={car.coordinates.longitude}
                          onChange={(e) =>
                            handleNestedChange(
                              car._id,
                              "coordinates",
                              "longitude",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Features
                      </label>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-1">
                        {Object.values(Features).map((feature) => (
                          <div key={feature} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`${car._id}-${feature}`}
                              checked={car.features.includes(feature)}
                              onChange={() =>
                                handleFeatureToggle(car._id, feature)
                              }
                              className="mr-2"
                            />
                            <label
                              htmlFor={`${car._id}-${feature}`}
                              className="text-sm text-gray-700"
                            >
                              {feature}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => saveChanges(car._id)}
                        className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => toggleEdit(car._id)}
                        className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarDashboard;
