import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import ProtectedRoutes from "./auth/protected";
import Loading from "./ui/Loader";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "./store/auth";
import { getCartAsync } from "./store/cart";

// Lazy load pages
const Home = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./auth/loginPage"));
const ProductListByCategoryPage = lazy(() =>
  import("./pages/productListByCategoryPage")
);
const ProductDetailsPage = lazy(() => import("./pages/productDetailsPage"));
const CheckoutPage = lazy(() => import("./pages/CheckOut"));
function App() {
  const isOpen = useSelector((state) => state.cart.toggle);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    return true;
  };

  useEffect(() => {
    if (checkAuthentication()) {
      dispatch(userLoggedIn());
      dispatch(getCartAsync());
    }
    const loadTime = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(loadTime);
  }, []);

  return (
    <BrowserRouter>
      <header className="container ">
        <Navbar />
        <div className="h-24"></div>
      </header>

      {/* Suspense ensures lazy loading works properly */}
      <Suspense fallback={<Loading isCartOpen={isOpen} />}>
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/product-details/:id"
              element={<ProductDetailsPage />}
            />
            <Route
              path="/productlist/:category"
              element={<ProductListByCategoryPage />}
            />

            {/* Protected Routes */}

            <Route
              path="/checkout/:id"
              element={
                <ProtectedRoutes>
                  <CheckoutPage />
                </ProtectedRoutes>
              }
            />
          </Routes>
        )}
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
