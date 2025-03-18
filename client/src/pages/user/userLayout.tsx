import UserNavbar from "@/components/user/userNavbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <UserNavbar />
      haga
      <Outlet />
    </div>
  );
};

export default UserLayout;
