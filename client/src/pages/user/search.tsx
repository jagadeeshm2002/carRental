import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { Car, Type } from "@/types/type"; // Ensure this import matches your actual enum location
import { carSearchSchema } from "@/types/zod";

import CarCard from "@/components/carCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { FilterIcon, Search, XCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Client } from "@/api/client";
import { Skeleton } from "@/components/ui/skeleton";

// Improved debounce function with better performance
function debounce(
  func: (values: CarSearchFormValues) => void,
  wait: number
): (values: CarSearchFormValues) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: CarSearchFormValues | null = null;

  return function (values: CarSearchFormValues) {
    lastArgs = values;

    const later = () => {
      timeout = null;
      if (lastArgs) {
        func(lastArgs);
      }
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}

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
    // Safely parse type parameter
    type: Object.values(Type).includes(searchParams.get("type") as Type)
      ? (searchParams.get("type") as Type)
      : undefined,
    // Safely get location parameter
    location: searchParams.get("location") || undefined,
    // Safely parse sortBy parameter
    sortBy: ["price", "rating", "distance"].includes(
      searchParams.get("sortBy") || ""
    )
      ? (searchParams.get("sortBy") as "price" | "rating" | "distance")
      : undefined,
    // Safely parse sortOrder parameter
    sortOrder: ["asc", "desc"].includes(searchParams.get("sortOrder") || "")
      ? (searchParams.get("sortOrder") as "asc" | "desc")
      : undefined,
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

  // Get current sort option for the dropdown
  const currentSortOption =
    formValues.sortBy && formValues.sortOrder
      ? `${formValues.sortBy}-${formValues.sortOrder}`
      : "";

  // Use a ref to track if we're currently resetting filters
  const isResetting = useRef(false);

  // Effect to update URL params when form values change - with debounce to prevent excessive updates
  useEffect(() => {
    // Skip URL updates during reset operation
    if (isResetting.current) return;

    // Use a timeout to debounce URL updates
    const timer = setTimeout(() => {
      // Get current search params
      const currentParams = new URLSearchParams(window.location.search);
      const newParams = new URLSearchParams();

      // Preserve location, pickupDate, and returnDate from the URL if they exist
      const preserveParams = ["location", "pickupDate", "returnDate"];
      preserveParams.forEach((param) => {
        if (currentParams.has(param)) {
          newParams.set(param, currentParams.get(param)!);
        }
      });

      // Only add modelName if it's explicitly set by the user
      if (formValues.modelName && formValues.modelName.trim() !== "") {
        newParams.set("modelName", formValues.modelName);
      }

      // Only add type if it's explicitly set
      if (formValues.type) {
        newParams.set("type", formValues.type);
      }

      // Only add sort parameters if they're explicitly set by the user through the UI
      if (formValues.sortBy && formValues.sortOrder && currentSortOption) {
        newParams.set("sortBy", formValues.sortBy);
        newParams.set("sortOrder", formValues.sortOrder);
      }

      // Don't update URL if parameters haven't changed
      const newParamsString = newParams.toString();
      const currentParamsString = currentParams.toString();
      if (newParamsString !== currentParamsString) {
        setSearchParams(newParams);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [formValues, setSearchParams, isResetting]);

  // Handle sort option change - split into sortBy and sortOrder
  const handleSortChange = (sortOption: string) => {
    const [sortBy, sortOrder] = sortOption.split("-") as [
      CarSearchFormValues["sortBy"],
      CarSearchFormValues["sortOrder"]
    ];
    setValue("sortBy", sortBy);
    setValue("sortOrder", sortOrder);
  };

  // Function to fetch cars - wrapped in useCallback to prevent unnecessary re-renders
  const fetchCars = useCallback(async (data: CarSearchFormValues) => {
    setLoading(true);
    setError(null);
    try {
      // Clean up the data object to remove null/undefined values
      const cleanParams = Object.fromEntries(
        Object.entries(data).filter(
          ([, value]) => value !== undefined && value !== null && value !== ""
        )
      );

      // Make the API request with clean parameters
      const response = await Client.get("/cars", {
        params: cleanParams,
      });

      // Check if response exists and has data
      if (!response || !response.data) {
        setError("No data received from server");
        setCars([]);
        return;
      }

      // Check if cars array exists in response
      if (Array.isArray(response.data.cars)) {
        setCars(response.data.cars);
        // Set pagination if it exists
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      } else {
        setError("Invalid data format received");
        setCars([]);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch cars. Please try again later.";
      setError(errorMessage);
      setCars([]);
    } finally {
      setLoading(false);
    }
  }, []);
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    fetchCars(formValues);
  };

  // Create a stable debounced fetch function that persists across renders
  const debouncedFetchRef =
    useRef<(values: CarSearchFormValues) => void | null>(null);

  // Initialize the debounced function once with a longer delay to prevent excessive API calls
  useEffect(() => {
    // Create a debounced version that only executes after user stops changing filters
    debouncedFetchRef.current = debounce((values: CarSearchFormValues) => {
      if (!isResetting.current) {
        fetchCars(values);
      }
    }, 500); // Increased debounce time to reduce API calls

    // Clean up function
    return () => {
      // Clear any pending debounced calls when component unmounts
      debouncedFetchRef.current = null;
    };
  }, [fetchCars]);

  // Memoized function to call the debounced fetch - prevents recreation on every render
  const debouncedFetch = useCallback((values: CarSearchFormValues) => {
    if (debouncedFetchRef.current && !isResetting.current) {
      debouncedFetchRef.current(values);
    }
  }, []);

  // Memoize the form values to prevent unnecessary re-renders
  const memoizedFormValues = useMemo(() => {
    return {
      modelName: formValues.modelName,
      type: formValues.type,
      location: formValues.location,
      sortBy: formValues.sortBy,
      sortOrder: formValues.sortOrder,
      page: formValues.page,
      limit: formValues.limit,
    };
  }, [
    formValues.modelName,
    formValues.type,
    formValues.location,
    formValues.sortBy,
    formValues.sortOrder,
    formValues.page,
    formValues.limit,
  ]);

  // Fetch cars when component mounts or form values change
  useEffect(() => {
    // Skip if we're in the middle of resetting
    if (isResetting.current) return;

    // Use debounced fetch to prevent flickering and excessive API calls
    debouncedFetch(memoizedFormValues);
  }, [memoizedFormValues, debouncedFetch]);

  // Initial fetch on component mount
  useEffect(() => {
    // This will run only once when the component mounts
    fetchCars(defaultCarSearchValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Optimized reset function to prevent excessive re-renders
  const resetFilters = useCallback(() => {
    // Set the resetting flag to true to prevent other effects from running
    isResetting.current = true;

    // Batch all state updates together to prevent multiple re-renders
    // First, clear the URL parameters
    setSearchParams(new URLSearchParams());

    // Clear cars array and reset pagination to prevent flashing old results
    setCars([]);
    setPagination({
      page: 1,
      limit: 10,
      total: 0,
      pages: 0,
    });

    // Then reset the form with minimal default values
    reset({
      modelName: "",
      type: undefined,
      location: undefined,
      sortBy: undefined,
      sortOrder: undefined,
      page: 1,
      limit: 10,
    });

    // Use a longer timeout to ensure all state updates have completed
    setTimeout(() => {
      // Fetch cars with minimal parameters
      fetchCars({
        page: 1,
        limit: 10,
      });

      // Reset the flag after the operation is complete
      isResetting.current = false;
    }, 100);
  }, [fetchCars, reset, setSearchParams, setCars, setPagination]);

  // Toggle mobile filters - memoized to prevent unnecessary re-renders
  const toggleFilters = useCallback(() => {
    setFiltersVisible((prev) => !prev);
  }, []);

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
                    <SelectItem value="all">ALL Type</SelectItem>
                    {Object.values(Type).map((type) => (
                      <SelectItem key={type} value={type} className="hover:text-black text-black">
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
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="h-40 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <XCircleIcon className="h-16 w-16 text-red-600 mb-4" />
              <h3 className="text-xl font-medium text-red-600 mb-1">
                No cars found
              </h3>
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


