import { Car } from "@/types/type";
import { Link } from "react-router-dom";

const CarCard: React.FC<{ car: Car }> = ({ car }) => {
  return (
    <Link to={`/cars/${car._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={car.imageUrl || "/api/placeholder/400/240"}
          alt={car.modelName}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{car.modelName}</h3>
            <div className="flex items-center">
              <svg
                className="h-4 w-4 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 15.585l-7.682 4.035 1.46-8.543L.307 7.223l8.558-1.244L10 0l2.135 5.98 8.558 1.244-5.47 5.305 1.46 8.543L10 15.585z"
                  clipRule="evenodd"
                />
              </svg>
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
