import React, { useEffect } from "react";
import { Banner, TrendingProducts } from "../components/home";
import Sidebar from "../ui/Sidebar";
import { DownloadApp } from "../components/download/download";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../store/menu";

const HomePage = () => {
  const dispatch = useDispatch();
  const isActiveMenu = useSelector((state) => state.menu.value);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 780 && !isActiveMenu) {
        dispatch(toggleMenu(true));
      } else if (window.scrollY < 780) {
        dispatch(toggleMenu(false));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, isActiveMenu]);

  return (
    <div className="max-auto mb-20">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col lg:flex-row w-full mb-20">
        {/* Sidebar - Visible on large screens */}
        <div className="w-full lg:w-1/5 hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-4/5 flex flex-col h-full pl-2">
          <Banner />
          <div className="py-6">
            <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">
              Trending Products
            </h2>
            <TrendingProducts />
          </div>
        </div>
      </div>
      <DownloadApp />
    </div>
  );
};

export default HomePage;
