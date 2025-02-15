import React from "react";
import downloadImg from "../../assets/Home/downloadImg.png";
import appStoreImg from "../../assets/Home/appStore.png";
import playStoreImg from "../../assets/Home/playstore.png";

export const DownloadApp = () => {
  return (
    <div className="relative w-[90%] mx-auto bg-gray-100 rounded-lg overflow-hidden px-6 py-8 flex flex-col lg:flex-row items-center shadow-md justify-around">
      {/* Left: Image */}
      <div className="w-40 lg:w-52 flex-shrink-0">
        <img src={downloadImg} alt="download" className="w-full" />
      </div>

      {/* Right: Content */}
      <div className="text-center lg:text-left lg:ml-6 flex flex-col items-center lg:items-start">
        <p className="text-xl font-bold text-gray-900">
          Download Snapdeal App Now
        </p>
        <p className="text-sm text-gray-600 mt-1">Fast, Simple & Delightful.</p>
        <p className="text-sm text-gray-500 mt-1">
          All it takes is 30 seconds to download.
        </p>

        {/* Store Buttons */}
        <div className="flex gap-3 mt-4">
          <img
            src={appStoreImg}
            alt="app store"
            className="w-32 cursor-pointer"
          />
          <img
            src={playStoreImg}
            alt="play store"
            className="w-32 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
