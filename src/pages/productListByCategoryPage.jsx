import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Prodoctstore } from "../constants/data";
import { updateDetails } from "../store/reducer";

import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../store/menu";
export default function productListByCategoryPage() {
  // to store categorized data
  const [products, setProducts] = useState([]);

  const { isAuthenticated } = useAuth0(); // authentication
  // get category from url using hook
  const { category } = useParams();
  // console.log(category);
  const dispatch = useDispatch(); // dispatch action to update the redux store
  const navigate = useNavigate(); // hook for navigation
  // get all wished products from redux store
  const menu = useSelector((state) => state.menu.toggle);

  // navigate to product detail page with updated state
  const handleDetailsPage = (product) => {
    // dispatch(updateDetails(product));
    navigate(`/product-details/${product.id}`);
  };
  // handling wishedList and authenticating
  // console.log(category);

  // filter item based on category
  useEffect(() => {
    if (!menu) {
      dispatch(toggleMenu(true));
    }
    if (category) {
      const filteredItem = Prodoctstore.filter((item) => {
        if (category === "groceries") {
          return item.category === "electronics" || item.category === category;
        }
        return item.category === category;
      });
      filteredItem.sort((a, b) => b.id - a.id);
      setProducts(filteredItem);
    }
  }, [category]);
  return (
    // {product list }
    <div className="grid grid-cols-4 gap-4 px-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded-md text-center bg-white shadow"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-40 mx-auto cursor-pointer"
            loading="lazy"
            onClick={() => handleDetailsPage(product)}
          />

          <div
            className=" cursor-pointer"
            onClick={() => handleDetailsPage(product)}
          >
            <p className="mt-2 font-medium">{product.title}</p>
            <p className="text-red-500 font-bold">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
