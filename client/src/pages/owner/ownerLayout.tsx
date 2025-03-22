import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context";
import { LogOut, Menu, Package, PlusCircle, User, X } from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const OwnerLayout: React.FC = () => {
  const { user, updateUser, setToken } = useGlobalContext();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const getActiveTab = () => {
    const path = location.pathname.split("/");
    return path[path.length - 1];
  };

  const activeTab = getActiveTab();

  const isActiveTab = (tab: string) => {
    if (tab === "dashboard" && activeTab === "dashboard") return true;
    return tab === activeTab;
  };

  const getLinkClass = (tab: string) => {
    const baseClass =
      "flex items-center p-2 rounded-md transition-colors duration-200";
    const activeClass = "bg-blue-50 text-blue-700";
    const inactiveClass = "text-gray-600 hover:bg-blue-50 hover:text-blue-700";

    return `${baseClass} ${isActiveTab(tab) ? activeClass : inactiveClass}`;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user");
    updateUser(null);
    setToken(null);
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-blue-600">Owner Dashboard</h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="p-1"
          >
            {sidebarOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Sidebar content */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className={getLinkClass("owner")}>
                <User
                  className={`h-5 w-5 ${
                    isActiveTab("dashboard") ? "text-blue-600" : "text-blue-500"
                  }`}
                />
                {sidebarOpen && <span className="ml-3">Profile</span>}
              </Link>
            </li>
            <li>
              <Link to="/dashboard/cars" className={getLinkClass("cars")}>
                <Package
                  className={`h-5 w-5 ${
                    isActiveTab("cars") ? "text-blue-600" : "text-blue-500"
                  }`}
                />
                {sidebarOpen && <span className="ml-3">My Cars</span>}
              </Link>
            </li>
            <li>
              <Link to="/dashboard/new   car" className={getLinkClass("addcar")}>
                <PlusCircle
                  className={`h-5 w-5 ${
                    isActiveTab("addcar") ? "text-blue-600" : "text-blue-500"
                  }`}
                />
                {sidebarOpen && <span className="ml-3">Add Car</span>}
              </Link>
            </li>
            <li>
              <Link to="/dashboard/orders" className={getLinkClass("orders")}>
                <Package
                  className={`h-5 w-5 ${
                    isActiveTab("orders") ? "text-blue-600" : "text-blue-500"
                  }`}
                />
                {sidebarOpen && <span className="ml-3">Orders</span>}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-gray-200">
          <ul className="space-y-2">
            <li>
              <button
                onClick={logout}
                className="w-full flex items-center p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors duration-200"
              >
                <LogOut className="h-5 w-5 text-gray-500" />
                {sidebarOpen && <span className="ml-3">Logout</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;
