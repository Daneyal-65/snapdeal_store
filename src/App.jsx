import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import ProtectedRoutes from "./auth/protected";
import Loading from "./ui/Loader";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { updateUser } from "./api";

// Lazy load pages
const Home = lazy(() => import("./pages/HomePage"));
const Cart = lazy(() => import("./pages/CartPage"));
const ProductListByCategoryPage = lazy(() =>
  import("./pages/productListByCategoryPage")
);
const ProductDetailsPage = lazy(() => import("./pages/productDetailsPage"));
const CheckoutPage = lazy(() => import("./pages/CheckOut"));
const Login = lazy(() => import("./auth/login"));
const { isAuthenticated, user } = useAuth0();
function App() {
  const isOpen = useSelector((state) => state.cart.toggle);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isAuthenticated && user) {
      updateUser(user);
    }
    const loadTime = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(loadTime);
  }, [isAuthenticated, user]);

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
            <Route path="/login" element={<Login />} />
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

            <Route
              path="/cart"
              element={
                <ProtectedRoutes>
                  <Cart />
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
