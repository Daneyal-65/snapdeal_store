import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginModal = () => {
  // Toggle between Login & Register
  const { loginWithRedirect } = useAuth0();
  const [toggleCart, setToggleCart] = useState(true);
  const { isAuthenticated } = useAuth0();
  const nav = useNavigate();
  useEffect(() => {
    if (!toggleCart && !isAuthenticated) {
      var timer = setTimeout(() => {
        setToggleCart(true);
      }, 1000);
    }
    return () => clearTimeout(timer);
  });
  return toggleCart ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] h-[300px] relative">
        <button
          onClick={() => {
            setToggleCart(!toggleCart);
            nav("/");
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {/* Tabs */}
        <div className="flex justify-center mb-4 border-b pb-2 items-center flex-col gap-5">
          <h2 className="text-black text-2xl font-bold mt-10">
            Need to SignIn !
          </h2>
          <h3 className="text-blue-500 underline font-sans">
            <Link to="/"> Browse Products -Go to HomePage </Link>
          </h3>
          <button
            className="w-20 h-10 text-white bg-red-900 hover:bg-gray-100 hover:text-black outline-none bolder-none
          font-sans transition-all duration-1000 ease-in-out rounded-2xl"
            onClick={() => loginWithRedirect()}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default LoginModal;
