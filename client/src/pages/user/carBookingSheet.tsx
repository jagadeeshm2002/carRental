import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { format, differenceInDays } from "date-fns";
import { Calendar } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useGlobalContext } from "@/context/index";
import { CarDetails } from "@/types/type";

const CarBookingSheet = ({
  car,
  onBookingComplete,
  open,
  setOpen,
}: {
  car: CarDetails;
  onBookingComplete: () => void;
  open: boolean;
  setOpen: () => void;
}) => {
  const [totalDays, setTotalDays] = useState(1);
  const [totalAmount, setTotalAmount] = useState(car.discountedPrice || 0);
  const { user } = useGlobalContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      car: car._id,
      pickupDate: format(new Date(), "yyyy-MM-dd"),
      returnDate: format(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        "yyyy-MM-dd"
      ),
      totalDays: 1,
      totalAmount: car.discountedPrice || 0,
      user: user?.id || "",
    },
  });

  const pickupDate = watch("pickupDate");
  const returnDate = watch("returnDate");

  // Calculate total days and amount when dates change
  useEffect(() => {
    if (pickupDate && returnDate) {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);

      // Ensure return date is not before pickup date
      if (end < start) {
        setValue("returnDate", pickupDate);
        return;
      }

      const days = differenceInDays(end, start) + 1;
      const amount = days * car.discountedPrice;

      setTotalDays(days);
      setTotalAmount(amount);

      setValue("totalDays", days);
      setValue("totalAmount", amount);
    }
  }, [pickupDate, returnDate, car.discountedPrice, setValue]);

  const onSubmit = async (data) => {
    try {
      // Here you would make an API call to your backend
      console.log("Booking data:", data);

      // Call the onBookingComplete callback if provided
      if (onBookingComplete) {
        onBookingComplete(data);
      }

      // Close the sheet
      setOpen(false);
    } catch (error) {
      console.error("Error booking car:", error);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Book {car.modelName}</SheetTitle>
            <SheetDescription>
              Fill in the details to book this car
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupDate">Pickup Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          id="pickupDate"
                          type="date"
                          className="pl-8"
                          min={format(new Date(), "yyyy-MM-dd")}
                          {...register("pickupDate")}
                        />
                      </div>
                      {errors.pickupDate && (
                        <p className="text-sm text-red-500">
                          {errors.pickupDate.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="returnDate">Return Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          id="returnDate"
                          type="date"
                          className="pl-8"
                          min={pickupDate}
                          {...register("returnDate")}
                        />
                      </div>
                      {errors.returnDate && (
                        <p className="text-sm text-red-500">
                          {errors.returnDate.message}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price per day:</span>
                      <span className="font-medium">
                        ${car.discountedPrice}/day
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total days:</span>
                      <span className="font-medium">{totalDays} days</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total amount:</span>
                      <span>${totalAmount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <input type="hidden" {...register("car")} />
            <input type="hidden" {...register("totalDays")} />
            <input type="hidden" {...register("totalAmount")} />
            <input type="hidden" {...register("user")} />

            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit">Confirm Booking</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CarBookingSheet;
