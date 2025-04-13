import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar1Icon, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const searchFormSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
  pickupDate: z
    .date()
    .refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: "Pickup date must be today or later",
    }),
  returnDate: z
    .date()
    .refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: "Return date must be today or later",
    }),
});

export function SearchForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      location: "",
      pickupDate: undefined,
      returnDate: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof searchFormSchema>) => {
    const pickupDate = data.pickupDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const returnDate = data.returnDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    navigate(
      `/search?location=${encodeURIComponent(
        data.location
      )}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    );
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-flow-row md:flex  md:flex-row h-full justify-center items-center gap-2"
      >
        {/* Location Input */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-full rounded-md flex-1 mx-1 h-full items-start justify-center transition-all duration-200">
              <div className="flex flex-row gap-2 rounded-md w-full h-full">
                <div className="h-full w-1/5 flex justify-center items-center p-2">
                  <MapPinIcon className="w-full h-full " color="gray" />
                </div>
                <div className="h-full  w-4/5  flex justify-center items-start flex-col  !mt-0 pr-2">
                  <FormLabel className="text-base leading-none font-GeraldtonRegular text-gray-700 py-1 ">
                    Location
                  </FormLabel>

                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      className="w-full rounded-md border px-3 py-2 text-sm"
                      placeholder="Enter your location"
                    />
                  </FormControl>
                </div>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <Separator
          className="h-2/3 w-[1.5px] bg-gray-300"
          orientation="vertical"
        />

        {/* Pickup Date */}
        <FormField
          control={form.control}
          name="pickupDate"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-full rounded-md flex-1 mx-1 h-full items-start justify-center transition-all duration-200">
              <div className="flex flex-row gap-2 rounded-md w-full h-full">
                <div className="h-full w-1/5 flex justify-center items-center p-2">
                  <Calendar1Icon className="w-full h-full " color="gray" />
                </div>
                <div className="h-full w-4/5 flex justify-center items-start flex-col !mt-0  pr-2">
                  <FormLabel className="text-base leading-none font-GeraldtonRegular text-gray-700 py-1">
                    Pickup Date
                  </FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full hover:text-white hover:bg-primary transition-all duration-200 justify-start  ${
                          field.value ? "" : "text-gray-400"
                        }`}
                      >
                        {field.value
                          ? format(field.value, "PPP")
                          : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <FormMessage className="transition-all duration-200 " />
            </FormItem>
          )}
        />
        <Separator
          className="h-2/3 w-[1.5px] bg-gray-300"
          orientation="vertical"
        />

        {/* Return Date with Calendar Picker */}
        <FormField
          control={form.control}
          name="returnDate"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-full rounded-md flex-1 mx-1 h-full items-start justify-center transition-all duration-200">
              <div className="flex flex-row gap-2 rounded-md w-full h-full">
                <div className="h-full w-1/5 flex justify-center items-center p-2">
                  <Calendar1Icon className="w-full h-full " color="gray" />
                </div>
                <div className="h-full w-4/5 flex justify-center items-start flex-col !mt-0 pr-2">
                  <FormLabel className="text-base leading-none font-GeraldtonRegular text-gray-700 py-1">
                    Return Date
                  </FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full hover:text-white hover:bg-primary transition-all duration-200 justify-start  ${
                          field.value ? "" : "text-gray-400"
                        }`}
                      >
                        {field.value
                          ? format(field.value, "PPP")
                          : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <Separator
          className="h-2/3 w-[1.5px] bg-gray-300"
          orientation="vertical"
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full md:w-[10vw] h-[3.5rem] font-GeraldtonRegular text-xl"
        >
          Search
        </Button>
      </form>
    </Form>
  );
}
