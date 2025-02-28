import React from "react";
import logo from "../assets/images/rentcarsicon.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackgroundImage from "../assets/images/watchman logo.png";
import CarHero from "../assets/images/car.png";
import AudiCar from "../assets/images/audicar.png";
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
import {
  BadgeCheck,
  Calendar1Icon,
  CalendarHeart,
  CarFront,
  GoalIcon,
  MapPinIcon,
  MenuIcon,
  Timer,
  TimerReset,
  Facebook,
  Instagram,
  Twitter,
  Github,
} from "lucide-react";
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
        <main className=" mt-48`1 md:mt-0 w-full h-full overflow-ellipsis">
          <div className="flex flex-col  justify-center items-center h-[calc(100vh-60px)]">
            <div className="w-full flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-3">
                <h1 className=" text-5xl md:text-7xl font-bold text-black text-center  md:text-start ">
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
                <p className="text-xl font-light font-GeraldtonRegular text-gray-600 w-4/5 text-center md:text-start ">
                  Compare and book cars in real time with a seamless rental
                  experience
                </p>
                <Button variant={"default"} className="px-6">
                  Get started
                </Button>
              </div>
              <div className="w-full   md:w-1/2 relative min-h-[300px] h-full overflow-visible -z-0 overflow-y-clip">
                <div className="absolute md:w-[60vw] w-[80vw]  h-[60vh] md:h-[70vh] top-[-0vw] md:top-[-10vw] right-[-20vw] md:right-[-40vw] rotate-45 select-none ">
                  <img
                    src={BackgroundImage}
                    alt="logo background"
                    className="w-[80vw] select-none "
                    draggable={"false"}
                  />
                </div>
                <div className="z-10 md:w-[70vw] w-[400px] h-[80vh] md:h-[60vh] top-[10vw] md:top-[10vw] right-[-10vw] md:right-[-30vw] absolute animate-in slide-in-from-right-60  transition-all duration-500">
                  <img
                    src={CarHero}
                    alt="Hero car image"
                    className="w-full"
                    draggable={"false"}
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-fit  relative z-10 flex justify-center items-center">
              <div className="bg-white rounded-xl w-fit h-fit shadow-lg  p-2 shadow-blue-50 ">
                <SearchForm />
              </div>
            </div>
          </div>
        </main>
        <div className="w-full flex-col flex justify-center items-center py-10">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="text-center bg-primary/15 rounded-xl py-2 px-4">
              <p className="text-primary font-GeraldtonRegular text-xl">
                How it work
              </p>
            </div>
            <div className="w-full text-center">
              <h2 className="font-Geraldton text-3xl md:text-4xl py-10 px-2">
                Rent with following 3 working steps
              </h2>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center items-start gap-5 px-24">
              <div className="w-full md:w-1/3">
                <div className="flex justify-center items-center pb-2">
                  <div className="flex justify-center items-center bg-primary/15 rounded-xl w-[100px] h-[100px] p-5">
                    <MapPinIcon className="w-[50px] h-[50px] stroke-primary" />
                  </div>
                </div>
                <div className="justify-center items-center flex flex-col">
                  <p className="font-bold text-xl">Choose location</p>
                  <p className="font-GeraldtonRegular text-gray-600 w-2/3 text-center">
                    Choose your and find your best car
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="flex justify-center items-center pb-2">
                  <div className="flex justify-center items-center bg-primary/15 rounded-xl w-[100px] h-[100px] p-5">
                    <CalendarHeart className="w-[50px] h-[50px] stroke-primary " />
                  </div>
                </div>
                <div className="justify-center items-center flex flex-col">
                  <p className="font-bold text-xl">Pick-up date</p>
                  <p className="font-GeraldtonRegular text-gray-600 text-center w-2/3">
                    Select your pick up date and time to book your car
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="flex justify-center items-center pb-2">
                  <div className="flex justify-center items-center bg-primary/15 rounded-xl w-[100px] h-[100px] p-5">
                    <CarFront className="w-[50px] h-[50px] stroke-primary " />
                  </div>
                </div>
                <div className="justify-center items-center flex flex-col">
                  <p className="font-bold text-xl">Book your car</p>
                  <p className="font-GeraldtonRegular text-gray-600 text-center w-2/3">
                    Book your car and we will deliver it directly to you
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row justify-center items-start gap-10 py-10 mt-20">
            {[...Array(8)].map((_, i) => {
              return (
                <p key={i} className="text-5xl text-gray-400 select-none">
                  Logos
                </p>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col md:flex-row py-16 overflow-y-clip">
          <div className="w-full md:w-1/2 relative hidden md:block">
            <div className="absolute lg:w-[40vw] w-[50vw]  h-[60vh] lg:h-[50vh] -top-7 left-[-10vw] lg:left-[-20vw] rotate-45 select-none ">
              <img
                src={BackgroundImage}
                alt="logo background"
                className="w-[80vw] select-none "
                draggable={"false"}
              />
            </div>
            <div className=" absolute -left-96 top-10 w-[50vw] h-[50vw] slide-in-from-left-20 animate-in transition-all duration-300">
              <img src={AudiCar} alt="car image" draggable={"false"} />
            </div>
          </div>
          <div className="w-full md:w-1/2  px-10 md:px-0 flex flex-col justify-start gap-4">
            <div className="bg-primary/15 px-4 py-2 rounded-xl w-fit">
              <p className="text-primary">why Choose us</p>
            </div>
            <h2 className="text-3xl my-3 text-gray-900">
              We offer the best experience with our rental deals
            </h2>
            <div className="flex-col flex w-full gap-4">
              <div className="flex flex-row gap-3 ">
                <div className="flex justify-center items-center">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <BadgeCheck className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                </div>
                <div className="">
                  <p className="text-xl">Best price guaranteed</p>
                  <p className="text-sm text-gray-600">
                    Find a lower price? We'll refund you 100% of the differnce
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3 ">
                <div className="flex justify-center items-center">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <GoalIcon className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                </div>
                <div className="">
                  <p className="text-xl">Experience driver</p>
                  <p className="text-sm text-gray-600">
                    Don’t have driver? Don’t worry, we have many experienced
                    driver for you.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3 ">
                <div className="flex justify-center items-center">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <TimerReset className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                </div>
                <div className="">
                  <p className="text-xl">24 hour car delivery</p>
                  <p className="text-sm text-gray-600">
                    Book your car anytime and we will deliver it directly to
                    you.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3 ">
                <div className="flex justify-center items-center">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <Timer className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                </div>
                <div className="">
                  <p className="text-xl">24/7 technical support</p>
                  <p className="text-sm text-gray-600">
                    Have a question? Contact Rentcars support any time when you
                    have problem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-background border-t w-full static bottom-0">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Your Company. All rights
                  reserved.
                </p>
              </div>

              <nav className="flex flex-wrap gap-4 mb-4 md:mb-0">
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms
                </Link>
                <Link
                  to="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy
                </Link>
              </nav>

              <div className="flex space-x-4">
                <Link
                  to="https://twitter.com"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  to="https://facebook.com"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  to="https://instagram.com"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  to="https://github.com"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
          </div>
        </footer>
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
