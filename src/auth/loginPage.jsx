import React from "react";
import LoginModal from "./LoginModal";

export default function loginPage() {
  return (
    <div className="w-full h-screen mx-auto flex justify-center items-center flex-col gap-1">
      <h2>Sing In </h2>
      <p>for Explore more products ,Cart and Order !</p>
      <LoginModal />
    </div>
  );
}
