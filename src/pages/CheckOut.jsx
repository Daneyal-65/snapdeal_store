import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toggleMenu } from "../store/menu";
import { getProductById } from "../api/products";
import CartModal from "../ui/CartModal";
import PlaceOrderModal from "../ui/orderModal";

const CheckoutPage = () => {
  // State to store product details
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const menu = useSelector((state) => state.menu.value);

  useEffect(() => {
    // Ensure menu is toggled on when the component mounts
    if (!menu) {
      dispatch(toggleMenu(true));
    }

    // Fetch product details by ID
    getProductById(id)
      .then((res) => {
        setProduct(res || {});
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  // Function to get the quantity of the product in the cart
  const getQuantity = (id) => {
    const quantity = cart.find((cart) => cart.product?._id === id);
    return quantity ? quantity.quantity : "0";
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Confirmation Message */}
      <div className="bg-green-500 text-white p-4 rounded-md flex justify-between items-center mt-4">
        <span>✔ {product.name}</span>
        <button className="text-xl">✖</button>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 mt-4 shadow-md rounded-md flex flex-wrap md:flex-nowrap justify-between">
        <div className="flex flex-wrap md:flex-nowrap items-center space-x-4 w-full md:w-auto">
          {/* Product Image */}
          <img
            src={product.image}
            alt="Product"
            className="w-20 h-20 object-cover"
          />
          <div>
            {/* Product Details */}
            <p className="text-lg font-semibold">{product.name}</p>
            <h2 className="text-lg font-semibold">{product.subCategory}</h2>
            <p className="text-gray-600">{Math.floor(product.price)}.0</p>
          </div>
        </div>
        <div className="text-right w-full md:w-auto mt-4 md:mt-0">
          {/* Order Information */}
          <p className="text-lg">
            Your Order: <span className="font-bold">{getQuantity(id)}</span>
          </p>
          <p className="text-xl font-semibold">
            You Pay: Rs. {Math.floor(product.price)}.0
          </p>
          <p className="text-sm text-gray-500">
            (Including delivery and other charges)
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-end space-x-4 mt-4">
        <div className="bg-gray-800 text-white rounded-md px-1 pt-2 w-full md:w-auto">
          {/* Cart Modal Button */}
          <CartModal />
        </div>

        <div className="bg-red-600 text-white px-6 py-2 rounded-md w-full md:w-auto mt-2 md:mt-0">
          {/* Place Order Button */}
          <PlaceOrderModal />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
