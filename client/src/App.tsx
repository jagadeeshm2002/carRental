import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "@/components/ui/sonner";
import { useGlobalContext } from "./context";

function App() {
  const { user } = useGlobalContext();
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public routes accessible to everyone */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<LandingPage />} />
        <Route path="/cars/:id" element={<LandingPage />} />
        
        {/* Authentication routes - redirect if already logged in */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/" /> : <Register />} 
        />
        
        {/* Protected user routes */}
        {user && user.role === "user" && (
          <Route path="/user" element={<Outlet />}>
            <Route path="profile" element={<LandingPage />} />
            <Route path="orders" element={<LandingPage />} />
            <Route path="favourites" element={<LandingPage />} />
            <Route path="reviews" element={<LandingPage />} />
          </Route>
        )}
        
        {/* Protected owner routes */}
        {user && user.role === "owner" && (
          <Route path="/owner" element={<Outlet />}>
            <Route path="profile" element={<LandingPage />} />
            <Route path="cars" element={<LandingPage />} />
            <Route path="orders" element={<LandingPage />} />
            <Route path="cars/new" element={<LandingPage />} />
            <Route path="cars/:id" element={<LandingPage />} />
          </Route>
        )}
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
