import React, { useState } from "react";
import { Map, Image, X } from "lucide-react";
import { z } from "zod";
import { Client } from "@/api/client";
import { toast } from "sonner";
import { useGlobalContext } from "@/context";

// Using the enums from your TypeScript definitions
const Type = {
  SEDAN: "sedan",
  SUV: "suv",
  HATCHBACK: "hatchback",
  COUPE: "coupe",
  CONVERTIBLE: "convertible",
  PICKUP: "pickup truck",
  MINIVAN: "minivan",
  ELECTRIC: "electric",
  SPORTS: "sports car",
  LUXURY: "luxury",
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

// Define the Zod schema
const carSchema = z.object({
  modelName: z.string().min(1, "Model name is required"),
  year: z
    .number()
    .min(1900, "Year must be at least 1900")
    .max(new Date().getFullYear() + 1, "Enter a valid year"),
  type: z.enum(Object.values(Type) as [string, ...string[]]),
  distance: z.string().min(1, "Distance/mileage is required"),
  originalPrice: z.number().positive("Enter a valid price"),
  discountedPrice: z
    .number()
    .min(0)
    .refine((val) => val === 0 || val < Number.MAX_SAFE_INTEGER, {
      message: "Invalid discounted price",
    })
    .optional(),
  coupon: z.string().optional(),
  duration: z.enum(Object.values(Duration) as [string, ...string[]]),
  imageUrl: z.array(z.string()).min(1, "At least one image is required"),
  location: z.string().min(1, "Location is required"),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  features: z.array(z.enum(Object.values(Features) as [string, ...string[]])),
  category: z.enum(Object.values(Category) as [string, ...string[]]),
});

// TypeScript type derived from the schema
type CarData = z.infer<typeof carSchema>;

// Add a custom refinement for discounted price
const carSchemaWithRefinements = carSchema.refine(
  (data) =>
    data.discountedPrice === undefined ||
    data.discountedPrice === 0 ||
    data.discountedPrice < data.originalPrice,
  {
    message: "Discounted price cannot be higher than original price",
    path: ["discountedPrice"],
  }
);

const CreateCarList = () => {
  const defaultCarData: CarData = {
    modelName: "",
    year: new Date().getFullYear(),
    type: Type.SEDAN,
    distance: "",
    originalPrice: 0,
    discountedPrice: 0,
    coupon: "",
    duration: Duration.DAILY,
    imageUrl: [],
    location: "",
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    features: [],
    category: Category.ECONOMY,
  };
  const { user } = useGlobalContext();

  const [carData, setCarData] = useState<CarData>(defaultCarData);
  const [formErrors, setFormErrors] =
    useState<z.ZodFormattedError<CarData> | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [previewExpanded, setPreviewExpanded] = useState(false);

  // Handle input changes
  const handleChange = (
    field: keyof CarData,
    value:
      | string
      | number
      | typeof Type
      | typeof Duration
      | typeof Category
      | string[]
  ) => {
    setCarData({
      ...carData,
      [field]: value,
    });
  };

  // Handle nested object changes (coordinates)
  const handleNestedChange = (
    parent: "coordinates",
    field: "latitude" | "longitude",
    value: number
  ) => {
    setCarData({
      ...carData,
      [parent]: {
        ...carData[parent],
        [field]: value,
      },
    });
  };

  // Handle feature toggle
  const handleFeatureToggle = (feature: string) => {
    const features = [...carData.features];
    if (features.includes(feature)) {
      setCarData({
        ...carData,
        features: features.filter((f) => f !== feature),
      });
    } else {
      setCarData({
        ...carData,
        features: [...features, feature],
      });
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only JPEG and PNG images are allowed.");
      return;
    }

    try {
      const fileName = `${user?.id}_${carData.modelName}_${
        carData.imageUrl.length + 1
      }${file.name.substring(file.name.lastIndexOf("."))}`;
      const response = await Client.get(
        `/presign?name=${fileName}&folder=cars`
      );
      const { signedUrl } = response.data;

      await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
          "Cache-Control": "public, max-age=86400, immutable",
        },
      });

      const newImageUrl = signedUrl.split("?")[0];

      setCarData({
        ...carData,
        imageUrl: [...carData.imageUrl, newImageUrl],
      });

      setImagePreview(newImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  // Remove an image
  const removeImage = (index: number) => {
    const newImages = [...carData.imageUrl];
    newImages.splice(index, 1);
    setCarData({
      ...carData,
      imageUrl: newImages,
    });

    // Update preview if needed
    if (imagePreview === carData.imageUrl[index]) {
      setImagePreview(newImages.length > 0 ? newImages[0] : null);
    }
  };

  // Submit form with Zod validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate the form data against the schema
      carSchemaWithRefinements.parse(carData);

      // If validation passes, continue with submission
      setFormErrors(null);
      setSubmitting(true);

      try {
        // Make API call
        await Client.post("/cars", {
          user: user?.id,
          ...carData,
        });
       

        // Reset form and show success toast
        setCarData(defaultCarData);
        setImagePreview(null);
        toast.success("Car listing created successfully!");
      } catch (apiError) {
        console.error("API Error:", apiError);
        toast.error("Failed to create car listing. Please try again.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set formatted errors from Zod
        setFormErrors(error.format());
        toast.error("Please correct the errors in the form.");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Helper to check if a field has an error
  const getFieldError = (field: string): string | undefined => {
    if (!formErrors) return undefined;

    // Handle nested fields
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      const parentErrors = formErrors[parent as keyof typeof formErrors];
      if (Array.isArray(parentErrors)) {
        return parentErrors[0];
      } else if (typeof parentErrors === "object" && parentErrors !== null) {
        return (
          parentErrors._errors?.[0] ||
          (parentErrors as Record<string, { _errors?: string[] }>)[child]
            ?._errors?.[0]
        );
      }
    }

    const fieldErrors = formErrors[field as keyof typeof formErrors];
    return Array.isArray(fieldErrors)
      ? fieldErrors[0]
      : fieldErrors?._errors?.[0];
  };

  // Toggle preview expansion
  const togglePreview = () => {
    setPreviewExpanded(!previewExpanded);
  };

  return (
    <div className=" min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-800">
            Create New Car List
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">
                    Basic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Model Name*
                      </label>
                      <input
                        type="text"
                        value={carData.modelName}
                        onChange={(e) =>
                          handleChange("modelName", e.target.value)
                        }
                        className={`w-full p-3 border ${
                          getFieldError("modelName")
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg`}
                        placeholder="e.g. Toyota Camry"
                      />
                      {getFieldError("modelName") && (
                        <p className="mt-1 text-sm text-red-500">
                          {getFieldError("modelName")}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year*
                      </label>
                      <input
                        type="number"
                        value={carData.year}
                        onChange={(e) =>
                          handleChange(
                            "year",
                            parseInt(e.target.value) || new Date().getFullYear()
                          )
                        }
                        className={`w-full p-3 border ${
                          getFieldError("year")
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg`}
                        min="1900"
                        max={new Date().getFullYear() + 1}
                      />
                      {getFieldError("year") && (
                        <p className="mt-1 text-sm text-red-500">
                          {getFieldError("year")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">
                    Vehicle Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <select
                        value={carData.type}
                        onChange={(e) => handleChange("type", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
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
                        value={carData.category}
                        onChange={(e) =>
                          handleChange("category", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      >
                        {Object.values(Category).map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Distance/Mileage*
                      </label>
                      <input
                        type="text"
                        value={carData.distance}
                        onChange={(e) =>
                          handleChange("distance", e.target.value)
                        }
                        className={`w-full p-3 border ${
                          getFieldError("distance")
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg`}
                        placeholder="e.g. 25,000 miles"
                      />
                      {getFieldError("distance") && (
                        <p className="mt-1 text-sm text-red-500">
                          {getFieldError("distance")}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <select
                        value={carData.duration}
                        onChange={(e) =>
                          handleChange("duration", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      >
                        {Object.values(Duration).map((duration) => (
                          <option key={duration} value={duration}>
                            {duration}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">
                    Pricing
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Original Price (₹)*
                      </label>
                      <input
                        type="number"
                        value={carData.originalPrice}
                        onChange={(e) =>
                          handleChange(
                            "originalPrice",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className={`w-full p-3 border ${
                          getFieldError("originalPrice")
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg`}
                        min="0"
                        step="100"
                      />
                      {getFieldError("originalPrice") && (
                        <p className="mt-1 text-sm text-red-500">
                          {getFieldError("originalPrice")}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discounted Price (₹)
                      </label>
                      <input
                        type="number"
                        value={carData.discountedPrice}
                        onChange={(e) =>
                          handleChange(
                            "discountedPrice",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className={`w-full p-3 border ${
                          getFieldError("discountedPrice")
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg`}
                        min="0"
                        step="100"
                      />
                      {getFieldError("discountedPrice") && (
                        <p className="mt-1 text-sm text-red-500">
                          {getFieldError("discountedPrice")}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Coupon Code
                      </label>
                      <input
                        type="text"
                        value={carData.coupon}
                        onChange={(e) => handleChange("coupon", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="e.g. SUMMER20"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">
                    Location
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location*
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={carData.location}
                          onChange={(e) =>
                            handleChange("location", e.target.value)
                          }
                          className={`w-full p-3 pl-10 border ${
                            getFieldError("location")
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-lg`}
                          placeholder="e.g. San Francisco, CA"
                        />
                        <Map
                          className="absolute left-3 top-3 text-gray-400"
                          size={18}
                        />
                      </div>
                      {getFieldError("location") && (
                        <p className="mt-1 text-sm text-red-500">
                          {getFieldError("location")}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Latitude
                      </label>
                      <input
                        type="number"
                        value={carData.coordinates.latitude}
                        onChange={(e) =>
                          handleNestedChange(
                            "coordinates",
                            "latitude",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className={`w-full p-3 border ${
                          getFieldError("coordinates.latitude")
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg`}
                        step="0.000001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Longitude
                      </label>
                      <input
                        type="number"
                        value={carData.coordinates.longitude}
                        onChange={(e) =>
                          handleNestedChange(
                            "coordinates",
                            "longitude",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className={`w-full p-3 border ${
                          getFieldError("coordinates.longitude")
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg`}
                        step="0.000001"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">
                    Images
                  </h2>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label
                      htmlFor="imageUpload"
                      className={`mb-3 p-4 border-2 border-dashed ${
                        getFieldError("imageUrl")
                          ? "border-red-400 bg-red-50"
                          : "border-blue-300 bg-blue-50"
                      } rounded-lg text-center cursor-pointer hover:bg-blue-100 transition block`}
                    >
                      <Image className="mx-auto text-blue-500 mb-2" size={32} />
                      <p className="text-sm text-blue-600 font-medium">
                        Click to upload images
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload multiple images for your car listing
                      </p>
                    </label>
                    {getFieldError("imageUrl") && (
                      <p className="mt-1 text-sm text-red-500">
                        {getFieldError("imageUrl")}
                      </p>
                    )}

                    {carData.imageUrl.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-3">
                        {carData.imageUrl.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Car preview ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">
                    Features
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                    {Object.values(Features).map((feature) => (
                      <div key={feature} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`feature-${feature}`}
                          checked={carData.features.includes(feature)}
                          onChange={() => handleFeatureToggle(feature)}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`feature-${feature}`}
                          className="text-sm text-gray-700"
                        >
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center ${
                      submitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {submitting ? "Creating..." : "Create Listing"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div
            className={`${
              previewExpanded
                ? "fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
                : ""
            }`}
          >
            <div
              className={`bg-white rounded-xl shadow-md overflow-hidden ${
                previewExpanded ? "max-w-2xl w-full" : "h-full"
              }`}
            >
              <div className="relative">
                {previewExpanded && (
                  <button
                    onClick={togglePreview}
                    className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-1"
                  >
                    <X size={20} />
                  </button>
                )}

                <div
                  className={`${
                    previewExpanded ? "h-64" : "h-48"
                  } bg-blue-100 relative flex items-center justify-center`}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Car preview"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={togglePreview}
                    />
                  ) : (
                    <div className="text-blue-400 text-center p-4">
                      <Image size={48} className="mx-auto mb-2 opacity-50" />
                      <p>No image selected</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-2">
                  {carData.modelName || "Car Model"}{" "}
                  {carData.year || new Date().getFullYear()}
                </h2>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Map size={16} className="mr-1" />
                  <span>{carData.location || "Location not specified"}</span>
                </div>

                <div className="grid grid-cols-2 gap-y-2 mb-4 text-sm">
                  <div className="text-gray-600">
                    <span className="font-medium">Type:</span> {carData.type}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Category:</span>{" "}
                    {carData.category}
                  </div>
                  {carData.distance && (
                    <div className="text-gray-600">
                      <span className="font-medium">Mileage:</span>{" "}
                      {carData.distance}
                    </div>
                  )}
                  <div className="text-gray-600">
                    <span className="font-medium">Duration:</span>{" "}
                    {carData.duration}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline">
                    {carData.originalPrice > 0 && (
                      <>
                        <span className="text-xl font-bold text-blue-800">
                          ₹
                          {carData.discountedPrice !== undefined &&
                          carData.discountedPrice > 0
                            ? carData.discountedPrice.toLocaleString()
                            : carData.originalPrice.toLocaleString()}
                        </span>
                        {carData.discountedPrice !== undefined &&
                          carData.discountedPrice > 0 &&
                          carData.discountedPrice < carData.originalPrice && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ${carData.originalPrice.toLocaleString()}
                            </span>
                          )}
                      </>
                    )}
                  </div>
                </div>

                {carData.features.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Features:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {carData.features.map((feature) => (
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

                <p className="text-sm text-gray-500 italic">
                  This is a preview of your listing. Complete the form and
                  submit to create your listing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCarList;
