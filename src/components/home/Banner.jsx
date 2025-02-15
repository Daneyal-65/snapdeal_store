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
    "BOB",
    "Health",
    "Westernwear",
    "Kurta Sets",
    "Kitchen Needs",
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
      <div className="relative w-[90%] h-[300px] overflow-hidden px-4">
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
      <div className="flex justify-around w-[90%]  my-2">
        {carouselNavigationButtons.map((label, index) => (
          <button
            key={index}
            className={`transition-all p-1 px-2 rounded shadow hover:shadow-2xl ${
              index === current
                ? "bg-gray-100  border-black" // Active dot
                : "bg-red-500" // Inactive dot
            }`}
            onClick={() => goToSlide(index)} // Change slide on click
            aria-label={`Go to slide ${index + 1}`} // Accessibility
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
