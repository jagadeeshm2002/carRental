import { Outlet } from "react-router-dom";
import Navbar from "@/components/navBar"; // Import your navbar component

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This will render the matched route content */}
    </>
  );
};

export default MainLayout;
