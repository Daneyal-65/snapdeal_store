import React from "react";
import CartModal from "./CartModal";
import Sidebar from "./Sidebar";

export default function MobileSideBar() {
  return (
    <div className="absolute -left-[120px] top-0">
      <div className="absolute -left-full top-[50px]">
        <div className="bg-red-500 mb-1 rounded-b-md">
          <CartModal />
        </div>
        <div className=" overflow-scroll">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
