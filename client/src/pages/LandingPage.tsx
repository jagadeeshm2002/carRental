import React from "react";
import logo from "../assets/images/rentcarsicon.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

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
    <div className="min-h-screen w-full px-[2vw] md:px-[5vw] lg:px-[10vw] xl:px-[15vw] transition-all duration-50 ease-linear ">
      <div className=" w-full h-screen bg-white">
        <header className="flex justify-between items-center h-[60px]">
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
                className="p-2 hover:text-gray-700 active:text-black text-black "
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
      </div>
    </div>
  );
};

export default LandingPage;
