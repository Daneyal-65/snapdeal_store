import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { ChevronDown, Gift, Menu, Package, Search, User } from "lucide-react";
import CartModal from "./CartModal";
import LogoutButton from "../auth/logout";
import LoginModal from "../auth/LoginModal";
import { useSelector } from "react-redux";
import MobileSideBar from "./MobileSideBar";

export default function MobileNav({
  query,
  handleSearch,
  filterdItems,
  inputRef,
  setQuery,
}) {
  const [isMenu, setMenuActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const nav = useNavigate();

  return (
    <div className="border-b border-gray-200 bg-[#DC143C] w-full h-[50px]">
      {/* logo  */}
      <div className="flex items-center gap-2 py-1">
        <Link to="/" className="flex-shrink-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDndnZpFptqzAqmVgUGmYPuIy2PSZC5G6O4Q&s"
            alt="Snapdeal"
            className="h-8"
          />
        </Link>
        {/* search */}
        <div className="flex">
          <div className="flex relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products & brands"
              className="w-[200px] px-1 py-1 text-gray-800 rounded-l focus:outline-none bg-white"
              onChange={(e) => handleSearch(e)}
              value={query}
            />
            <button
              className="absolute right-0 top-0 cursor-pointer bg-black text-white px-1 py-[6px] hover:text-black hover:bg-white 
            transition-all duration-500 font-black ease-in-out"
              onClick={() => {
                setQuery("");
                nav("/productlist/women's clothing");
              }}
            >
              <Search className="w-5 h-5 font-bold" />
            </button>
            {query.length > 0 && (
              <ul
                className="absolute top-full bg-gray-100 shadow-2xl z-30 text-black w-full flex flex-col gap-1
                  px-2 py-1 "
              >
                {filterdItems.map((item) => (
                  <Link
                    key={item}
                    to={"/productlist/women's clothing"}
                    onClick={() => setQuery("")}
                  >
                    <li
                      className="shadow-2xl border-amber-400 hover:bg-white transition-all duration-100 rounded px-1"
                      key={item}
                    >
                      {item}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center relative h-10  transition-all duration-1000 ease-in-out hover:bg-red-400 rounded">
          <button className="" onClick={() => setMenuActive(!isMenu)}>
            <Menu width={30} className="font-black text-white" />
          </button>

          {isMenu && <MobileSideBar />}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center hover:text-gray-200 w-[100px] text-white"
          >
            <User className="h-6" />
            <span className="mx-1 text-gray-200">
              {isAuthenticated ? "profile" : "login"}
            </span>
            <ChevronDown className="w-4 h-4 text-black" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
              <Link
                to="/orders"
                className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                <Package className="w-4 h-4 mr-2" />
                Orders
              </Link>
              <Link
                to="/gift-voucher"
                className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                <Gift className="w-4 h-4 mr-2" />
                E-Gift Voucher
              </Link>
              <div className="border-t border-gray-700 my-1" />

              {/* log in sign In */}
              {isAuthenticated ? <LogoutButton /> : <LoginModal />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
