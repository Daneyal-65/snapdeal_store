import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";

import { categories } from "../constants/categories";
import { Link } from "react-router-dom";

const moreCategories = [
  "Automotives",
  "Mobile & Accessories",
  "Electronics",
  "Sports, Fitness & Outdoor",
  "Computers & Gaming",
  "Books, Media & Music",
  "Hobbies",
];

const trendingSearches = [
  "Kitchen Product",
  "Shoes For Men",
  "Kurti Set",
  "Sandal Men",
  "Sport Shoe Men",
];
export default function Sidebar() {
  const [activeCategory, setActiveCategory] = useState(null);
  const getCategory = (uri) => {
    if (uri === "EYEWEAR") return "/productlist/Sunglasses";

    if (activeCategory === "Women's Fashion" && uri === "CLOTHING") {
      return "/productlist/women's clothing";
    }
    if (activeCategory === "Home & Kitchen") return "/productlist/Kitchen";
    if (activeCategory === "Women's Fashion" && uri === "CLOTHING") {
      return "/productlist/women's clothing";
    }
    if (activeCategory === "Men's Fashion" && uri === "CLOTHING") {
      return "/productlist/men's clothing";
    }

    if (
      activeCategory === "Women's Fashion" ||
      (activeCategory === "Men's Fashion" && uri === "FOOTWEAR")
    ) {
      return "/productlist/shoes";
    }
    if (activeCategory === "Toys, Kids' Fashion & more") {
      return "/productlist/Kids Clothing & Toys";
    }
    if (activeCategory === "Beauty, Health & Daily Needs") {
      return "/productlist/beauty";
    }
  };
  return (
    <div className="w-54 bg-white shadow-lg h-screen mx-auto">
      {/* Top Categories */}
      <div className="p-4">
        <h2 className="font-semibold text-gray-800 mb-4">TOP CATEGORIES</h2>
        <div className="space-y-2">
          {Object.entries(categories).map(([name, data]) => (
            <div
              key={name}
              className="relative "
              onMouseEnter={() => setActiveCategory(name)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <a
                href="#"
                className="flex items-center gap-3 p-2 transition-all duration-1000 ease-in-out hover:bg-gray-50 rounded-md group"
              >
                <span className="text-xl">{data.icon}</span>
                <span className="text-sm text-gray-700 group-hover:text-[#DC143C]">
                  {name}
                </span>
                <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
              </a>

              {/* Mega Menu */}
              {activeCategory === name && (
                <div className="absolute left-full top-0  w-[800px] bg-white shadow-xl rounded-md z-50 flex ">
                  <div className="flex-1 grid grid-cols-3 gap-6 p-6">
                    {Object.entries(data.sections).map(([title, section]) => (
                      <div key={title}>
                        <h3 className="font-semibold text-gray-800 mb-3">
                          {section.title}
                        </h3>
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={item}>
                              <Link
                                to={getCategory(title)}
                                className="text-sm text-gray-600 hover:text-[#DC143C]"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                          {section.viewAll && (
                            <li>
                              <a
                                href="#"
                                className="text-sm text-blue-500 hover:text-blue-600"
                              >
                                View All &gt;
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {data.image && (
                    <div className="w-64 p-4">
                      <img
                        src={data.image || "/placeholder.svg"}
                        alt="Category Banner"
                        className="w-full h-auto rounded-md"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* More Categories */}
      <div className="p-4 border-t">
        <h2 className="font-semibold text-gray-800 mb-4">MORE CATEGORIES</h2>
        <ul className="space-y-2">
          {moreCategories.map((category) => (
            <li key={category}>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-[#DC143C] block  hover:bg-gray-50 rounded-md"
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
