import { Car } from "@/types/type";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import CarImage from "@/assets/images/car.png"

const CarCard: React.FC<{ car: Car }> = ({ car }) => {
  return (
    <Link to={`/cars/${car._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={car.imageUrl[0] || CarImage}
          alt={car.modelName}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{car.modelName}</h3>
            <div className="flex items-center">
              <Star className="fill-yellow-500" strokeWidth={0} />
              <span className="ml-1 text-sm">{car.rating}</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="mr-2">{car.year}</span>
              <span className="mr-2">•</span>
              <span>{car.type}</span>
              <span className="mr-2">•</span>
              <span>{car.distance.toLocaleString()} km</span>
            </div>
            <div className="mt-1">{car.location}</div>
          </div>
          <div className="mt-2">
            <span className="text-lg font-semibold">
              ${car.discountedPrice.toLocaleString()}
            </span>
            {car.originalPrice > car.discountedPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${car.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {car.features.slice(0, 3).map((feature: string) => (
              <span
                key={feature}
                className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs"
              >
                {feature}
              </span>
            ))}
            {car.features.length > 3 && (
              <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs">
                +{car.features.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
