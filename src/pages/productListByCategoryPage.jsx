import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../store/menu";
import { searchProducts } from "../api/products";

export default function ProductListByCategoryPage() {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menu = useSelector((state) => state.menu.toggle);

  const handleDetailsPage = (product) => {
    navigate(`/product-details/${product._id}`);
  };

  useEffect(() => {
    if (!menu) {
      dispatch(toggleMenu(true));
    }
    if (category) {
      searchProducts(category).then((res) => {
        setProducts(res);
      });
    }
  }, [category, dispatch, menu]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-12 gap-3">
      {products.map((product, index) => (
        <div
          key={index}
          className="border p-2 sm:p-4 rounded-md text-center bg-white shadow-md hover:shadow-xl transition-all duration-300"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-40 object-contain rounded-md cursor-pointer"
            loading="lazy"
            onClick={() => handleDetailsPage(product)}
          />

          <div
            className="cursor-pointer mt-2"
            onClick={() => handleDetailsPage(product)}
          >
            <p className="font-medium text-sm md:text-base">{product.name}</p>
            <p className="text-red-500 font-bold text-sm md:text-lg">
              ₹{Math.floor(product.price)}.0
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
