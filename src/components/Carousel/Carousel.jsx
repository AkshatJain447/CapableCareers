import React, { useState, useEffect } from "react"; // Import React, useState, and useEffect for handling state and effects

import Image1 from "../../assets/carousal1.jpg";
import Image2 from "../../assets/carousal2.jpg";
import Image3 from "../../assets/carousal3.jpg";

const CarouselTransition = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // State to keep track of current slide

  const images = [Image1, Image2, Image3]; // Array of image sources

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length); // Update current slide to the next slide
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    ); // Update current slide to the previous slide, looping back to the last slide if currently on the first slide
  };

  // Function to automatically change slide
  const autoChangeSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  useEffect(() => {
    // Set up a timer to change slide automatically every 5 seconds
    const interval = setInterval(autoChangeSlide, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Run this effect only once when the component mounts

  return (
    <div className="relative w-full -z-10">
      <div className="relative h-56 overflow-hidden md:h-96">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${
              index === currentSlide ? "" : "hidden"
            } absolute inset-0`}
          >
            <img
              src={image}
              className="absolute inset-0 w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute flex items-center space-x-3 bottom-5 left-1/2 -translate-x-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-1 flex items-center justify-center h-full px-4 cursor-pointer focus:outline-none"
        onClick={prevSlide}
      >
        {/* Left arrow icon */}
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-1 flex items-center justify-center h-full px-4 cursor-pointer focus:outline-none"
        onClick={nextSlide}
      >
        {/* Right arrow icon */}
      </button>
    </div>
  );
};

export default CarouselTransition;
