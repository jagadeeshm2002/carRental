import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { Car, Type } from "@/types/type"; // Ensure this import matches your actual enum location
import {
  carSearchSchema,
  availableCategories,
  availableFeatures,
} from "@/types/zod";
import axios from "axios";
import CarCard from "@/components/carCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { FilterIcon, Loader2Icon, Search, XCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

// Define type for the form values based on the zod schema
type CarSearchFormValues = z.infer<typeof carSearchSchema>;

// Sort options
const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  // { value: "year-desc", label: "Year: Newest First" },
  // { value: "year-asc", label: "Year: Oldest First" },
  { value: "distance-asc", label: "Distance: Low to High" },
  { value: "distance-desc", label: "Distance: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
];

// Main search page component
const CarSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 1,
    pages: 1,
  });

  // Create a default values object for the form
  const defaultCarSearchValues: CarSearchFormValues = {
    modelName: searchParams.get("modelName") || "",
    // year: searchParams.get("year")
    //   ? Number(searchParams.get("year"))
    //   : undefined,
    type: (searchParams.get("type") as Type) || undefined,
    // minDistance: searchParams.get("minDistance")
    //   ? Number(searchParams.get("minDistance"))
    //   : undefined,
    // maxDistance: searchParams.get("maxDistance")
    //   ? Number(searchParams.get("maxDistance"))
    //   : undefined,
    // minPrice: searchParams.get("minDiscountedPrice")
    //   ? Number(searchParams.get("minDiscountedPrice"))
    //   : undefined,
    // maxPrice: searchParams.get("maxDiscountedPrice")
    //   ? Number(searchParams.get("maxDiscountedPrice"))
    //   : undefined,
    location: searchParams.get("location") || undefined,
    // features: searchParams.get("features")
    //   ? searchParams.get("features")!.split(",")
    //   : [],
    sortBy: searchParams.get("sortBy") !== "null" ? searchParams.get("sortBy") as
      | "price"
      // | "year"
      | "rating"
      | "distance"
      | undefined : undefined,
    sortOrder: searchParams.get("sortOrder") !== "null" ? searchParams.get("sortOrder") as "asc" | "desc" | undefined : undefined,
    page: pagination.page,
    limit: pagination.limit,
  };

  // Initialize form with values from URL params
  const { control, watch, setValue, reset, handleSubmit } =
    useForm<CarSearchFormValues>({
      resolver: zodResolver(carSearchSchema),
      defaultValues: defaultCarSearchValues,
    });

  // Watch all form values
  const formValues = watch();

  // Effect to update URL params when form values change
  useEffect(() => {
    const newParams = new URLSearchParams();

    // Add non-empty values to URL params
    Object.entries(formValues).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        if (Array.isArray(value)) {
          newParams.set(key, value.join(","));
        } else {
          newParams.set(key, String(value));
        }
      }
    });

    setSearchParams(newParams);
  }, [formValues, setSearchParams]);

  // Handle sort option change - split into sortBy and sortOrder
  const handleSortChange = (sortOption: string) => {
    const [sortBy, sortOrder] = sortOption.split("-") as [
      CarSearchFormValues["sortBy"],
      CarSearchFormValues["sortOrder"]
    ];
    setValue("sortBy", sortBy);
    setValue("sortOrder", sortOrder);
  };

  // Get current sort option for the dropdown
  const currentSortOption =
    formValues.sortBy && formValues.sortOrder
      ? `${formValues.sortBy}-${formValues.sortOrder}`
      : "";

  // Function to fetch cars
  const fetchCars = async (data: CarSearchFormValues) => {
    setLoading(true);
    setError(null);
    try {
      // In a real app, you would use the actual API endpoint
      const response = await axios.get("http://localhost:3000/api/v1/cars", {
        params: data,
      });
      if (!response.data) {
        setError(response.data.error);
        return;
      }

      setCars(response.data.cars);
      setPagination(response.data.pagination);
      console.log(response.data);
    } catch (error) {
      // For demo purposes, populate with mock data
      setError("Failed to fetch cars. Please try again later." + error);
      return;
      // setCars(generateMockCars());
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    fetchCars(formValues);
  };

  // Fetch cars when component mounts or form values change
  useEffect(() => {
    fetchCars(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // formValues.modelName,
    // formValues.year,
    // formValues.type,
    // formValues.minDistance,
    // formValues.maxDistance,
    // formValues.minPrice,
    // formValues.maxPrice,
    // formValues.location,
    // formValues.categories,
    formValues.sortBy,
    formValues.sortOrder,
  ]);

  // Reset all filters
  const resetFilters = () => {
    reset(defaultCarSearchValues);
  };

  // Toggle mobile filters
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  // Apply filters
  const applyFilters = () => {
    setFiltersVisible(false);
    fetchCars(formValues);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Car</h1>

      {/* Search and Sort Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <div className="w-full md:w-3/4">
          <div className="flex">
            <Controller
              name="modelName"
              control={control}
              render={({ field }) => (
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder="Search by model name..."
                    className="pl-10 pr-4 py-2 w-full"
                    {...field}
                  />
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              )}
            />
            <Button onClick={handleSubmit(fetchCars)} className="ml-2">
              Search
            </Button>
          </div>
        </div>

        <div className="flex items-center w-full md:w-auto">
          <select
            value={currentSortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-placeholder="Sort by"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={toggleFilters}
            className="ml-4 p-3 bg-gray-100 rounded-lg md:hidden"
            aria-label="Toggle filters"
          >
            <FilterIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div
          className={`w-full md:w-1/4 bg-white p-6 rounded-lg shadow ${
            filtersVisible ? "block" : "hidden md:block"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Reset All
            </button>
          </div>

          {/* Year Filter
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <YearFilter value={field.value} onChange={field.onChange} />
            )}
          /> */}

          {/* Type Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Car Type</h3>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Type</SelectItem>
                    {Object.values(Type).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Price Range Filter */}
          {/* <Controller
            name="minPrice"
            control={control}
            render={({ field: minField }) => (
              <Controller
                name="maxPrice"
                control={control}
                render={({ field: maxField }) => (
                  <RangeFilter
                    title="Price Range ($)"
                    minValue={minField.value}
                    maxValue={maxField.value}
                    onMinChange={minField.onChange}
                    onMaxChange={maxField.onChange}
                    step={1000}
                    minPossible={0}
                    maxPossible={100000}
                  />
                )}
              />
            )}
          /> */}

          {/* Distance Range Filter
          <Controller
            name="minDistance"
            control={control}
            render={({ field: minField }) => (
              <Controller
                name="maxDistance"
                control={control}
                render={({ field: maxField }) => (
                  <RangeFilter
                    title="Mileage (km)"
                    minValue={minField.value}
                    maxValue={maxField.value}
                    onMinChange={minField.onChange}
                    onMaxChange={maxField.onChange}
                    step={1000}
                    minPossible={0}
                    maxPossible={200000}
                    unit="km"
                  />
                )}
              />
            )}
          /> */}

          {/* Location Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Location</h3>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Enter city, state"
                />
              )}
            />
          </div>

          {/* Category Filter */}
          {/* <Controller
            name="categories"
            control={control}
            render={({ field }) => (
              <RadioFilter
                title="Category"
                options={availableCategories.map((cat) => ({
                  value: cat,
                  label: cat,
                }))}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          /> */}

          {/* Features Filter */}
          {/* <Controller
            name="features"
            control={control}
            render={({ field }) => (
              <CheckboxListFilter
                title="Features"
                options={availableFeatures}
                selectedOptions={field.value || []}
                onChange={field.onChange}
              />
            )}
          /> */}

          {/* Apply Filters Button (Mobile Only) */}
          <Button onClick={applyFilters} className="w-full mt-4">
            Apply Filters
          </Button>
        </div>

        {/* Car Results */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2Icon className="h-12 w-12 animate-spin text-blue-600" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <XCircleIcon className="h-16 w-16 text-red-600 mb-4" />
              <h3 className="text-xl font-medium text-red-600 mb-1">
                Error fetching cars
              </h3>
              <p className="text-gray-500">{error}</p>
            </div>
          ) : cars.length > 0 ? (
            <div>
              <div className="mb-4 text-gray-600">{cars.length} cars found</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <XCircleIcon className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-1">
                No cars found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or search term
              </p>
              <Button
                onClick={resetFilters}
                variant="link"
                className="mt-4 text-blue-600 font-medium hover:text-blue-800"
              >
                Reset all filters
              </Button>
            </div>
          )}

          {/* Pagination - Add this in a real app */}
          {pagination.total > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center">
                <Button variant="outline" disabled className="mr-2">
                  Previous
                </Button>
                <div className="flex mx-2">
                  {Array.from({ length: pagination.pages }, (_, index) => (
                    <Button
                      key={index}
                      variant={
                        index === pagination.page - 1 ? "default" : "ghost"
                      }
                      className="mx-1"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                <Button variant="outline" className="ml-2">
                  Next
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarSearchPage;

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
      category:
        availableCategories[
          Math.floor(Math.random() * availableCategories.length)
        ],
      rating: Number((Math.random() * 2 + 3).toFixed(1)), // Rating between 3.0 and 5.0
      imageUrl: `/api/placeholder/400/240`,
    });
  }

  return mockCars;
};
