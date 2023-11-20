import React, { useState } from "react";

const ImageSlideshow = ({ firstFourImages }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Check if images array is empty
  if (!firstFourImages || firstFourImages.length === 0) {
    return null; // or handle accordingly
  }

  return (
    <div className="slideshow-container">
      <div className="slideshow-image">
        <img
          className="rounded-xl object-cover w-full h-full"
          src={`data:${item.images[0].contentType};${imageData}`}
          alt="img"
        />
        <button className="prev" onClick={showPrevImage}>
          &#10094;
        </button>
        <button className="next" onClick={showNextImage}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default ImageSlideshow;
