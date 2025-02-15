import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toggleMenu } from "../store/menu";
import axios from "axios";

const CheckoutPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.value);
  useEffect(() => {
    if (!menu) {
      dispatch(toggleMenu(true));
    }

    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const foundProduct = res.data.find((prod) => prod.id === Number(id));
        setProduct(foundProduct || {});
        // console.log(product);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Confirmation Message */}
      <div className="bg-green-500 text-white p-4 rounded-md flex justify-between items-center mt-4">
        <span>✔ {product.title}</span>
        <button className="text-xl">✖</button>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 mt-4 shadow-md rounded-md flex justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={product.image}
            alt="Product"
            className="w-20 h-20 object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">Rs. 466</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg">
            Your Order: <span className="font-bold">{product.quantity}</span>
          </p>
          <p className="text-xl font-semibold">
            You Pay: Rs. {product.price * 82}
          </p>
          <p className="text-sm text-gray-500">
            (Including delivery and other charges)
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-4">
        <Link to="/cart">
          <button className="bg-gray-800 text-white px-6 py-2 rounded-md">
            View Cart
          </button>
        </Link>
        <button className="bg-red-600 text-white px-6 py-2 rounded-md">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
