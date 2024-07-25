import React from "react";
import "./ImageGallery.css";
import Image from "next/image";

const ImageGallery = ({ images }) => {
  console.log(images);

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="ImageGallery-container">
        <div className="ImageFirstColumn">
          {images.slice(0, 3).map((image, index) => (
             <Image
             key={index}
             className="ImageSecondColumn"
             src={`${cloudinaryTransformation(image?.attributes?.url,250,250)}`}
             alt={`imageGallery-${index}`}
             width={250}
             height={250}
           />
          ))}
        </div>
      <div className="ImagesSecondColumn">
          {images.slice(3, 6).map((image, index) => (
            <Image
              key={index}
              className="ImageSecondColumn"
              src={`${cloudinaryTransformation(image?.attributes?.url,250,250)}`}
              alt={`imageGallery-${index}`}
              height={250}
              width={250}
            />
          ))}

      </div>
      <div className="ImageFirstColumn">
          {images.slice(6, 9).map((image, index) => (
             <Image
             key={index}
             className="ImageSecondColumn"
             src={`${cloudinaryTransformation(image?.attributes?.url,250,250)}`}
             alt={`imageGallery-${index}`}
             width={250}
             height={250}
           />
          ))}
        </div>
    </div>
  );
};

export default ImageGallery;
