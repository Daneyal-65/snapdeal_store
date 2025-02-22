import React, { useState, useEffect, useRef } from "react";
import { CrousoleImg as images } from "../../assets/banner";

export default function Banner() {
  const [current, setCurrent] = useState(0); // Current slide index
  const timeoutRef = useRef(); // Store timeout reference

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear existing timeout
    }
  };

  const carouselNavigationButtons = [
    "BOB CARD",
    "ONDCFestive",
    "India @100 : Envisioning Tomorrow’s ",
    "Sports Footwear",
    "ETHNIC WEAR",
  ];

  useEffect(() => {
    resetTimeout(); // Clear previous timeout
    timeoutRef.current = setTimeout(
      () => setCurrent((prevIndex) => (prevIndex + 1) % images.length), // Auto-slide every 4s
      4000
    );

    return () => resetTimeout(); // Cleanup on unmount
  }, [current]);

  const goToSlide = (index) => {
    setCurrent(index); // Set slide manually on button click
  };

  return (
    <>
      <div className="relative md:w-[90%] h-[300px] overflow-hidden px-4">
        {/* Map through images and display slides */}
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Slide Image */}
            <img
              src={src}
              alt={`Carousel image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* Navigation Dots */}
      <div className="flex justify-between md:w-[90%] my-2 text-gray-600 text-sm gap-1 md:gap-0">
        {carouselNavigationButtons.map((label, index) => (
          <button
            key={index}
            className={`transition-all hover:underline ${
              index === current ? "font-semibold text-black" : ""
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
