import React, { useState, useEffect } from "react";
import { UserDetail } from "@/types/type";
import { useGlobalContext } from "@/context";

import { Client } from "@/api/client";
import { toast } from "sonner";

const OwnerProfile = () => {
  const [user, setUser] = useState<UserDetail | null>(null);
  const { user: userContext } = useGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API call
        const response = await Client.get(`/users/${userContext?.id}`);
        if (!response.data) {
          throw new Error("Failed to fetch user data");
        }
        const userData = response.data.user;
        setUser(userData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading)
    return <div className="text-center p-4">Loading user profile...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!user) return <div className="text-center p-4">User not found</div>;

  return (
    <div className=" mx-auto space-x-6">
      {isEditing ? (
        <EditProfileForm
          user={user}
          userId={userContext?.id || ""}
          onCancel={() => setIsEditing(false)}
          onSave={(updatedUser) => {
            setUser(updatedUser);
            setIsEditing(false);
          }}
        />
      ) : (
        <ProfileDetails user={user} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
};

export default OwnerProfile;

interface ProfileDetailsProps {
  user: UserDetail;
  onEdit: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user, onEdit }) => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Main Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profile Header Card - Spans full width */}
        <div className="md:col-span-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/20">
                <span className="text-white text-3xl font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                <p className="text-blue-100 text-sm">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onEdit}
              className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2 border border-white/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </button>
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-xl">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-gray-700 font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <p className="text-gray-700 font-medium">{user.phone || "Not provided"}</p>
            </div>
          </div>
        </div>

        {/* Address Card - Spans 2 columns */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-xl">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Address</h3>
          </div>
          {user.address ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Street</p>
                <p className="text-gray-700 font-medium">{user.address.no} {user.address.street}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">City</p>
                <p className="text-gray-700 font-medium">{user.address.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">State</p>
                <p className="text-gray-700 font-medium">{user.address.state}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Country</p>
                <p className="text-gray-700 font-medium">{user.address.country}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No address information provided</p>
          )}
        </div>

        {/* Driver License Card - Spans full width */}
        <div className="md:col-span-3 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-xl">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Driver License</h3>
          </div>
          {user.driverLicense ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">License Number</p>
                <p className="text-gray-700 font-medium">{user.driverLicense.number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Expiry Date</p>
                <p className="text-gray-700 font-medium">
                  {new Date(user.driverLicense.expiryDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                <p className="text-gray-700 font-medium">
                  {new Date(user.driverLicense.dob).toLocaleDateString()}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No driver license information provided</p>
          )}
        </div>
      </div>
    </div>
  );
};

interface EditProfileFormProps {
  user: UserDetail;
  onCancel: () => void;
  userId: string;
  onSave: (updatedUser: UserDetail) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  user,
  onCancel,
  userId,
  onSave,
}) => {
  const [formData, setFormData] = useState<UserDetail>({
    ...user,
    // Create deep copies of nested objects to avoid modifying the original user object
    address: { ...user.address },
    driverLicense: { ...user.driverLicense },
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...(prevData[parent as keyof UserDetail] as Record<string, unknown>),
          [child]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      driverLicense: {
        ...formData.driverLicense,
        [field]: value ? new Date(value) : null,
      },
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate name
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    // Validate phone (if provided)
    if (formData.phone && !/^\+?[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Use Axios for the PUT request
      const response = await Client.put(`/users/${userId}`, formData);

      if (response.status !== 200) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = response.data;
      onSave(updatedUser);
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrors({
        form: err instanceof Error ? err.message : "An unknown error occurred",
      });
      toast.error(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-8">Edit Profile</h2>

      {errors.form && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {errors.form}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`shadow appearance-none border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic mt-2">{errors.name}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email (cannot be changed)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              disabled
              className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-500 leading-tight bg-gray-100"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone || ""}
              onChange={handleChange}
              className={`shadow appearance-none border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic mt-2">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Address</h3>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address.no"
            >
              House/Apartment Number
            </label>
            <input
              id="address.no"
              name="address.no"
              type="text"
              value={formData.address?.no || ""}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address.street"
            >
              Street
            </label>
            <input
              id="address.street"
              name="address.street"
              type="text"
              value={formData.address?.street || ""}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address.city"
            >
              City
            </label>
            <input
              id="address.city"
              name="address.city"
              type="text"
              value={formData.address?.city || ""}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address.state"
            >
              State
            </label>
            <input
              id="address.state"
              name="address.state"
              type="text"
              value={formData.address?.state || ""}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address.country"
            >
              Country
            </label>
            <input
              id="address.country"
              name="address.country"
              type="text"
              value={formData.address?.country || ""}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          Driver License Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="driverLicense.number"
            >
              License Number
            </label>
            <input
              id="driverLicense.number"
              name="driverLicense.number"
              type="text"
              value={formData.driverLicense?.number || ""}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="driverLicense.expiryDate"
            >
              Expiry Date
            </label>
            <input
              id="driverLicense.expiryDate"
              type="date"
              value={
                formData.driverLicense?.expiryDate
                  ? new Date(formData.driverLicense.expiryDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) => handleDateChange(e, "expiryDate")}
              className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="driverLicense.dob"
            >
              Date of Birth
            </label>
            <input
              id="driverLicense.dob"
              type="date"
              value={
                formData.driverLicense?.dob
                  ? new Date(formData.driverLicense.dob)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) => handleDateChange(e, "dob")}
              className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-5 rounded mr-3 transition duration-300"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded transition duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};
