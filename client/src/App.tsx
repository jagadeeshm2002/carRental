import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "@/components/ui/sonner";
import { useGlobalContext } from "./context";
import UserLayout from "./pages/user/userLayout";
import OwnerLayout from "./pages/owner/ownerLayout";
import Search from "./pages/user/search";
import MainLayout from "./pages/mainLayout";
import CarView from "./pages/user/carView";

function App() {
  const { user, isLoggedIn } = useGlobalContext();
  return (
    <>
      <Toaster />
      <Routes>
        {/* Authenticated User Routes with UserLayout/Navbar */}
        {isLoggedIn && user?.role === "user" && (
          <Route element={<UserLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cars/:id" element={<CarView/>} />
            {/* <Route path="profile" element={<Profile />} />
            <Route path="/orders/:id" element={<Orders />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="reviews" element={<Reviews />} /> */}
            {/* Redirect unauthorized access */}
            <Route path="cars" element={<Navigate to="/" />} />
            <Route path="cars/new" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
          </Route>
        )}

        {/* Authenticated Owner Routes with OwnerLayout/Navbar */}
        {isLoggedIn && user?.role === "owner" && (
          <Route element={<OwnerLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<Search />} />
            {/* <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="profile" element={<Profile />} />
            <Route path="cars" element={<Cars />} />
            <Route path="orders" element={<Orders />} />
            <Route path="cars/new" element={<NewCar />} /> */}
            {/* Redirect unauthorized access */}
            <Route path="favourites" element={<Navigate to="/" />} />
            <Route path="reviews" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
          </Route>
        )}

        {/* Unauthenticated Routes with MainLayout/Landing Navbar */}
        {!isLoggedIn && (
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cars/:id" element={<CarView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Redirect protected routes to login */}
            <Route path="profile" element={<Navigate to="/login" />} />
            <Route path="orders" element={<Navigate to="/login" />} />
            <Route path="favourites" element={<Navigate to="/login" />} />
            <Route path="reviews" element={<Navigate to="/login" />} />
            <Route path="cars" element={<Navigate to="/login" />} />
            <Route path="cars/new" element={<Navigate to="/login" />} />
          </Route>
        )}

        {/* Catch-all route - should be outside the conditional rendering */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
