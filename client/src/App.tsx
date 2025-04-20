import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Toaster } from "@/components/ui/sonner";
import { useGlobalContext } from "@/context";
import UserLayout from "@/pages/user/userLayout";
import OwnerLayout from "@/pages/owner/ownerLayout";
import Search from "@/pages/user/search";
import MainLayout from "@/pages/mainLayout";
import CarView from "@/pages/user/carView";
import UserProfile from "@/pages/user/userProfile";
import Orders from "./pages/user/orders";
import Favourites from "./pages/user/favourites";
import Reviews from "./pages/user/reviews";
import OwnerOrders from "./pages/owner/orders";
import OwnerProfile from "./pages/owner/ownerProfile";
import Cars from "./pages/owner/cars";
import CreateCarList from "./pages/owner/createCarList";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

function App() {
  const { user, isLoggedIn } = useGlobalContext();
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<MainLayout />}>
          {/* Common routes for all users */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cars/:id" element={<CarView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Authenticated User Routes */}
          {isLoggedIn && user?.role === "user" && (
            <Route path="/dashboard" element={<UserLayout />}>
              {/* Add user-specific routes here */}
              <Route index element={<UserProfile />} />
              <Route path="orders" element={<Orders />} />
              <Route path="favourites" element={<Favourites />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          )}

          {/* Authenticated Owner Routes */}
          {isLoggedIn && user?.role === "owner" && (
            <Route path="/dashboard" element={<OwnerLayout />}>
              // <Route index element={<OwnerProfile />} />
              <Route path="orders" element={<OwnerOrders />} />
              <Route path="cars" element={<Cars />} />
              <Route path="newcar" element={<CreateCarList />} />
            </Route>
          )}

          {/* Protected routes */}
          <Route
            path="profile"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="orders"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="favourites"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="reviews"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="cars"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="cars/new"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />
            }
          />
        </Route>

        {/* Catch-all route - should be outside the conditional rendering */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
