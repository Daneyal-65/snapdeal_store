import { User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  // state for show and hide profile data
  const [isOpen, setIsOpen] = useState(false);
  // get all the required states and funtion from Auth0
  const { user, logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate(); // for navigating different routes
  // hook for toggle hide and show profile while clicking out side the
  // conponent
  const dropdownRef = useRef(null);
  // handaling logout
  const handleLogout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    logout({ logoutParams: { returnTo: window.location.origin } });
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        className="flex flex-col items-center group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="h-5 w-5 text-gray-700 group-hover:text-pink-500" />
        <span className="text-xs mt-1 text-gray-700 group-hover:text-pink-500">
          Profile
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && isAuthenticated && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
          {/* Header */}
          <div className="border-b pb-2 mb-2">
            <p className="font-semibold">Hello {user.name}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>

          {/* Menu Items */}
          <ul className="space-y-2 text-sm text-gray-700">
            {["Orders", "Wishlist", "Gift Cards", "Contact Us"].map((item) => (
              <li key={item} className="hover:text-red-500 cursor-pointer">
                {item}
              </li>
            ))}
            <li className="flex justify-between items-center hover:text-red-500 cursor-pointer">
              Myntra Insider{" "}
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                New
              </span>
            </li>

            <hr />

            {[
              "Myntra Credit",
              "Coupons",
              "Saved Cards",
              "Saved VPA",
              "Saved Addresses",
            ].map((item) => (
              <li key={item} className="hover:text-red-500 cursor-pointer">
                {item}
              </li>
            ))}

            <hr />

            <li className="hover:text-red-500 cursor-pointer">Edit Profile</li>

            {isAuthenticated && (
              <li
                className="hover:text-red-500 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
