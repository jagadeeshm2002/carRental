import { Car, Type } from "@/types/type";
import { availableFeatures } from "@/types/zod";

export const generateMockCars = (): Car[] => {
  const mockCars: Car[] = [];
  const carModels = [
    "Toyota Camry",
    "Honda Civic",
    "Ford F-150",
    "BMW X5",
    "Tesla Model 3",
    "Mercedes C-Class",
  ];
  const locations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Philadelphia, PA",
  ];

  for (let i = 0; i < 12; i++) {
    const randomModel = carModels[Math.floor(Math.random() * carModels.length)];
    const randomFeatures = availableFeatures
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 7) + 1);

    mockCars.push({
      _id: `car-${i}`,
      modelName: randomModel,
      year: Math.floor(Math.random() * (2023 - 2010 + 1)) + 2010,
      type: Object.values(Type)[
        Math.floor(Math.random() * Object.values(Type).length)
      ],
      distance: Math.floor(Math.random() * 100000),
      discountedPrice: Math.floor(Math.random() * 30000) + 10000,
      originalPrice: Math.floor(Math.random() * 40000) + 15000,
      location: locations[Math.floor(Math.random() * locations.length)],
      features: randomFeatures,
      category: "Economy",
      imageUrl: [
        `https://source.unsplash.com/random/300x200/?car,${randomModel.toLowerCase().replace(" ", "-")}`
      ],
      coordinates: {
        latitude: 40.7128,
        longitude: -74.006,
      },
      active: true,
      user: "user-1",
      duration: "daily",
      coupon: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return mockCars;
};
