import React from "react";
import logo from "../assets/images/rentcarsicon.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackgroundImage from "../assets/images/watchman logo.png";
import CarHero from "../assets/images/car.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar1Icon, MapPinIcon, MenuIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden ">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full justify-start  ">
        <nav className="flex justify-center items-start flex-col  gap-3 ">
          {NavItem.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="p-2 hover:text-gray-700 active:text-black hover:bg-primary/5 text-black w-full"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex flex-row gap-2 justify-center items-center ">
          <Link to="/login">
            <Button variant={"ghost"} className="text-black">
              Sign in
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant={"default"}>Sign up</Button>
          </Link>
        </div>

        <SheetFooter className="h-full">
          <p className="text-center text-xs text-black">&copy; 2023 RENTCARS</p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
const NavItem: {
  name: string;
  link: string;
}[] = [
  {
    name: "Become a Renter",
    link: "#",
  },
  { name: "Rental deals", link: "#" },
  { name: "About us", link: "#" },
  { name: "Help", link: "#" },
];

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full px-[2vw] md:px-[5vw] lg:px-[10vw] xl:px-[15vw] transition-all duration-50 ease-linear  overflow-x-hidden relative">
      <div className=" w-full h-screen bg-white">
        <header className="flex justify-between items-center h-[60px] relative  animate-in slide-in-from-top-10 tansition-all duration-500 z-10">
          <div className="px-2 flex flex-row self-start justify-center items-center h-full">
            <Link
              to="/"
              className="flex flex-row justify-center items-center gap-2"
            >
              <img src={logo} alt="rentcar" width={30} height={30} />
              <p className="font-extrabold text-foreground text-xl">RENTCARS</p>
            </Link>
          </div>
          <div className="block lg:hidden pr-[2vw]">
            <MobileNav />
          </div>

          <nav className="hidden lg:flex  justify-center items-center gap-3">
            {NavItem.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="p-2 hover:text-gray-700 active:text-black text-black font-extralight"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:flex  flex-row gap-2 justify-center items-center">
            <Link to="/login">
              <Button variant={"ghost"} className="text-black">
                Sign in
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant={"default"}>Sign up</Button>
            </Link>
          </div>
        </header>
        <main className="w-full h-full overflow-ellipsis">
          <div className="flex flex-col  justify-center items-center h-[calc(100vh-60px)]">
            <div className="w-full flex flex-row h-full">
              <div className="w-1/2 flex flex-col justify-center items-start gap-3">
                <h1 className="text-7xl font-bold text-black ">
                  Find the perfect car for your
                  <span className="text-primary relative inline-flex mx-2">
                    <p className="relative">next</p>
                    <div className="absolute bottom-1 left-0 w-full h-1 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="135"
                        height="20"
                        viewBox="0 0 135 20"
                        fill="none"
                      >
                        <path
                          d="M134.398 2.44549C57.1256 -2.5909 23.8505 5.91274 1.51269 9.4328C1.16554 12.3701 1.29738 14.7861 0.927661 19.4528C60.8229 -0.00283431 100.753 3.19444 134.353 4.43383C134.367 4.06436 134.357 3.5539 134.398 2.44549Z"
                          fill="#1572D3"
                        />
                      </svg>
                    </div>
                  </span>
                  adventure
                </h1>
                <p className="text-xl font-light font-GeraldtonRegular text-gray-600 w-4/5 ">
                  Compare and book cars in real time with a seamless rental
                  experience
                </p>
                <Button variant={"default"} className="px-6">
                  Get started
                </Button>
              </div>
              <div className="w-1/2 relative h-full overflow-visible -z-0">
                <div className="absolute w-[60vw]  h-[70vh] top-[-10vw] right-[-40vw] rotate-45  ">
                  <img
                    src={BackgroundImage}
                    alt="logo background"
                    className="w-[80vw]"
                  />
                </div>
                <div className="z-10 w-[70vw]  h-[60vh] top-[10vw] right-[-30vw] absolute animate-in slide-in-from-right-60  transition-all duration-500">
                  <img src={CarHero} alt="Hero car image" className="w-full" />
                </div>
              </div>
            </div>
            <div className="w-full h-[110px]  relative z-10">
              <div className="bg-white rounded-xl w-full h-full flex flex-row justify-center items-center shadow-lg  p-2 shadow-blue-50 ">
                <SearchForm />
              </div>
            </div>
          </div>
        </main>
        <div className="w-full h-screen">kdiv</div>
      </div>
    </div>
  );
};

export default LandingPage;

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
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      location: "",
      pickupDate: undefined,
      returnDate: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof searchFormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex  flex-row h-full justify-center items-center gap-2"
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
          className="w-[10vw] h-[3.5rem] font-GeraldtonRegular text-xl"
        >
          Search
        </Button>
      </form>
    </Form>
  );
}
