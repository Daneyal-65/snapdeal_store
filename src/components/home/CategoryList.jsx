import React, { useEffect, useState } from "react";
import { navItems } from "../../constants/links";
import { useNavigate } from "react-router-dom";

export default function CategoryList() {
  const [categories, setCategories] = useState([]); // Stores category list
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const categoriesLabel = navItems.map((item) => item.category); // Extract categories from navItems
    setCategories(categoriesLabel); // Set categories in state
  }, []); // Runs only on component mount

  const handleClick = (category) => {
    navigate(`/productlist/${category.toLocaleLowerCase()}`); // Navigate to selected category page
  };

  return (
    <div className="p-4">
      {/* Heading */}
      <h2 className="text-xl font-semibold mb-2">Shop by Category</h2>

      {/* Category Grid */}
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div
            onClick={() => handleClick(category)} // Handle category click
            key={index} // Unique key for each category
            className="p-4 border rounded-md text-center capitalize bg-gray-100"
          >
            {category} {/* Display category name */}
          </div>
        ))}
      </div>
    </div>
  );
}
