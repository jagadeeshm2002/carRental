
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "../assets/images/rentcarsicon.png";
import { MenuIcon } from "lucide-react";

import { useGlobalContext } from "@/context";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const { user } = useGlobalContext();
  console.log(user);
  return (
    <>
      <header className="flex justify-between items-center h-[60px] relative  animate-in slide-in-from-top-10 tansition-all duration-500 z-10 px-16">
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
          {user && user.role === "user" ? (
            <Link to="/search">
              <Button variant={"default"} className="text-white">
                Get started
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant={"ghost"} className="text-black">
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button variant={"default"}>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
};

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
export default NavBar;
