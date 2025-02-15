import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductSpecifications from "./extraDetails";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../store/menu";
import { addToCart } from "../../store/cart";
import { Prodoctstore } from "../../constants/data";

const ProductDetails = () => {
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
        let foundProduct = res.data.find((prod) => prod.id === Number(id));
        foundProduct =
          foundProduct || Prodoctstore.find((prod) => prod.id === Number(id));
        setProduct(foundProduct || {});
        // console.log(product);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <p className="text-sm text-gray-500">
        Home / Ethnic Wear For Women / Salwar Suit / Dress Materials
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Left: Product Image */}
        <div className="flex flex-col items-center">
          <img
            src={product?.image || ""}
            alt={product?.name || "Product Image"}
            className="w-[300px] h-[400px] object-contain"
          />
        </div>

        {/* Right: Product Details */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {product?.title || "Product Name"}
          </h1>

          {/* Rating */}
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 text-lg font-semibold">
              ⭐ {product?.rating?.rate || 0}
            </span>
            <span className="text-blue-600 ml-2">
              {product?.rating?.count || 0} Ratings
            </span>
            <a href="#" className="ml-2 text-blue-500">
              Have a question?
            </a>
          </div>

          {/* Price Details */}
          <div className="mt-4">
            <p className="text-red-600 text-2xl font-bold">
              Rs. {product?.price || "N/A"}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900"
              onClick={() => dispatch(addToCart(product))}
            >
              ADD TO CART
            </button>
            <Link to={`/checkout/${product.id}`}>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
                onClick={() => dispatch(addToCart(product))}
              >
                BUY NOW
              </button>
            </Link>
          </div>

          {/* Delivery Section */}
          <div className="mt-6">
            <p className="text-gray-700 font-semibold">Delivery</p>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                placeholder="Enter pincode"
                className="border p-2 rounded w-40 text-sm"
              />
              <button className="bg-gray-700 text-white px-4 py-2 text-sm rounded-md hover:bg-gray-800">
                CHECK
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Generally delivered in {product?.deliveryTime || "N/A"}
            </p>
          </div>

          {/* Guarantee */}
          <p className="text-gray-600 text-sm mt-4">
            ✅ Snapdeal Guarantee: Return and replacement allowed for 7 days
            after delivery.
          </p>
        </div>
      </div>
      <ProductSpecifications product={product} />
    </div>
  );
};

export default ProductDetails;
