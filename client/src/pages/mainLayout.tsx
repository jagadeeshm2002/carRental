import { Outlet } from "react-router-dom";
import Navbar from "@/components/navBar"; // Import your navbar component
import Footer from "./footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
