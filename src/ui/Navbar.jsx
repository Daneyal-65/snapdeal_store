import { useRef, useState } from "react";
import { Search, User, ChevronDown, Gift, Package, Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { searchData } from "../constants/data";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../auth/logout";
import LoginModal from "../auth/LoginModal";
import CartModal from "../ui/CartModal";
import MobileNav from "./mobileNav";
export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [query, setQuery] = useState("");
  const [filterdItems, setFilterItems] = useState(["mensCloth"]);
  const inputRef = useRef();
  const [isMenuActive, setMenuActive] = useState(false);
  const menu = useSelector((state) => state.menu.value);
  // handle side bar toggle
  const nav = useNavigate();
  const handleMenuClick = () => {
    setMenuActive(!isMenuActive);
  };
  const handleSearch = (e) => {
    const { value } = e.target;
    setQuery(value);
    const filteredSearchItems = searchData.filter((item) => {
      return (
        item.toLocaleLowerCase().startsWith(value.toLocaleLowerCase) ||
        item.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    });
    setFilterItems(filteredSearchItems);
  };

  return (
    <nav className=" mx-auto z-10 fixed top-0 right-0 left-0">
      <TopBanner />
      <div className="flex md:hidden">
        <MobileNav
          query={query}
          handleSearch={handleSearch}
          filterdItems={filterdItems}
          inputRef={inputRef}
          menu={true}
          handleMenuClick={handleMenuClick}
          setQuery={setQuery}
        />
      </div>
      <div className="border-b border-gray-200 bg-[#DC143C]  hidden md:block ">
        {/* {top banner} */}
        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Main header */}
          <div className=" text-white px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDndnZpFptqzAqmVgUGmYPuIy2PSZC5G6O4Q&s"
                alt="Snapdeal"
                className="h-8"
              />
            </Link>
            {/* {side bar} */}
            <div className="flex justify-center items-center relative h-10 w-10 transition-all duration-1000 ease-in-out hover:bg-red-400 rounded">
              {menu && (
                <button className="" onClick={handleMenuClick}>
                  <Menu width={30} className="font-black " />
                </button>
              )}
            </div>

            {/* Search bar */}
            <div className="flex-1 max-w-3xl mx-4">
              <div className="flex relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products & brands"
                  className="w-full px-4 py-2 text-gray-800 rounded-l focus:outline-none bg-white"
                  onChange={(e) => handleSearch(e)}
                  value={query}
                />
                <button
                  className="bg-gray-800 text-white px-6 py-2 rounded-r flex items-center hover:bg-gray-700"
                  onClick={() => {
                    setQuery("");
                    nav("/productlist/women's clothing");
                  }}
                >
                  <Search className="w-5 h-5" />
                  <span className="ml-2">Search</span>
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

            {/* Cart & Profile */}
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <div className="= text-white ">
                  <CartModal />
                </div>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center hover:text-gray-200"
                >
                  <User className="w-6 h-6" />
                  <span className="mx-2">
                    {isAuthenticated ? "profile" : "login"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
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
          {/* side bar */}
          <div className="absolute z-10">
            {isMenuActive && menu && <Sidebar onClick={handleMenuClick} />}
          </div>
        </div>
      </div>
    </nav>
  );
}

function TopBanner() {
  return (
    <div className="bg-[#702433]  text-white px-4 py-0 md:py-1 text-sm flex flex-col justify-between items-center shadow-2xl md:flex-row">
      <div className="text-[10px] md:text-[14px]">
        Brand Waali Quality, Bazaar Waali Deal!
      </div>
      <div className="flex items-center gap-4 text-[10px] md:text-[14px]">
        <Link to="#" className="hover:underline">
          Our Blog
        </Link>
        <Link to="#" className="hover:underline">
          Help Center
        </Link>
        <Link to="#" className="hover:underline">
          Sell On Snapdeal
        </Link>
        <Link to="#" className="hover:underline">
          Download App
        </Link>
      </div>
    </div>
  );
}
