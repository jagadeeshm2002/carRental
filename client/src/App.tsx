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
        <Route element={<MainLayout />}>
          {/* Common routes for all users */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cars/:id" element={<CarView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Authenticated User Routes */}
          {isLoggedIn && user?.role === "user" && (
            <Route element={<UserLayout />}>
              {/* Add user-specific routes here */}
              {/* <Route path="profile" element={<Profile />} />
              <Route path="/orders/:id" element={<Orders />} />
              <Route path="favourites" element={<Favourites />} />
              <Route path="reviews" element={<Reviews />} /> */}
            </Route>
          )}

          {/* Authenticated Owner Routes */}
          {isLoggedIn && user?.role === "owner" && (
            <Route element={<OwnerLayout />}>
              {/* Add owner-specific routes here */}
              {/* <Route path="/cars/:id" element={<CarDetails />} />
              <Route path="profile" element={<Profile />} />
              <Route path="cars" element={<Cars />} />
              <Route path="orders" element={<Orders />} />
              <Route path="cars/new" element={<NewCar />} /> */}
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
