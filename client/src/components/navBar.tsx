import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "../assets/images/rentcarsicon.png";
import { MenuIcon, User } from "lucide-react";

import { useGlobalContext } from "@/context";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const NavBar = () => {
  const { user, isLoggedIn } = useGlobalContext();

  const RoleBasedMenu: {
    [key: string]: { label: string; link: string }[];
  } = {
    user: [
      { label: "dashboard", link: "/dashboard" },
      { label: "Favourites", link: "/dashboard/favourites" },
      { label: "chats", link: "/dashboard/chats" },
    ],
    owner: [
      { label: "dashboard", link: "/dashboard" },
      { label: "Orders", link: "/dashboard/orders" },
      { label: "chats", link: "dashboard/chats" },
    ],
  };

  const ProfileDropdown = () => {
    return (
      <div className=" flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <User className=" text-gray-700" size={"5"} />
            </Button>
          </DropdownMenuTrigger>
          {user && user.role && RoleBasedMenu[user.role] && (
            <DropdownMenuContent
              align="end"
              className="w-56 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
            >
              {RoleBasedMenu[user.role].map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className="focus:bg-gray-100 focus:outline-none"
                >
                  <Link
                    to={item.link}
                    className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem className="focus:bg-gray-100 focus:outline-none">
                <Button
                  onClick={() => {
                    localStorage.removeItem("jwt_token");
                    localStorage.removeItem("user");
                    window.location.reload();
                  }}
                  className="flex w-full items-center px-3 py-2 text-sm text-red-600 hover:text-red-700 transition-colors duration-150"
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    );
  };
  return (
    <>
      <header className="flex  md:justify-between  items-center h-[60px] relative  animate-in slide-in-from-top-10 tansition-all duration-500 z-10 px-[5vw] md:px-[7vw] lg:px-[10vw] xl:px-[15vw] ">
        <div className="px-2 flex flex-row self-start justify-center items-center h-full">
          <Link
            to="/"
            className="flex flex-row justify-center items-center gap-2"
          >
            <img src={logo} alt="rentcar" width={30} height={30} />
            <p className="font-extrabold text-foreground text-xl">RENTCARS</p>
          </Link>
        </div>
        <div></div>
        <div className="flex w-full  justify-end items-center lg:hidden pr-[2vw] ">
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
        <div
          className=" flex  flex-row gap-2 justify-center items-center w-fit  "
          style={{ justifySelf: "end" }}
        >
          {isLoggedIn ? (
            <ProfileDropdown />
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
  const { isLoggedIn } = useGlobalContext();
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
        {!isLoggedIn && (
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
        )}

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
  { name: "Cars deals", link: "/search" },
  { name: "About us", link: "#" },
  { name: "Help", link: "#" },
];
export default NavBar;
