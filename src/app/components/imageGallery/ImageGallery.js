import React from "react";
import "./ImageGallery.css";

const ImageGallery = ({ images }) => {
  console.log(images);

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="ImageGallery-container">
        <div className="ImageFirstColumn">
          {images.slice(0, 3).map((image, index) => (
             <img
             key={index}
             className="ImageSecondColumn"
             src={`${cloudinaryTransformation(image?.attributes?.url,250,250)}`}
             alt={`imageGallery-${index}`}
             loading="lazy"
           />
          ))}
        </div>
      <div className="ImagesSecondColumn">
          {images.slice(3, 6).map((image, index) => (
            <img
              key={index}
              className="ImageSecondColumn"
              src={`${cloudinaryTransformation(image?.attributes?.url,250,250)}`}
              alt={`imageGallery-${index}`}
              loading="lazy"
            />
          ))}

      </div>
      <div className="ImageFirstColumn">
          {images.slice(6, 9).map((image, index) => (
             <img
             key={index}
             className="ImageSecondColumn"
             src={`${cloudinaryTransformation(image?.attributes?.url,250,250)}`}
             alt={`imageGallery-${index}`}
             loading="lazy"
           />
          ))}
        </div>
    </div>
  );
};

export default ImageGallery;
