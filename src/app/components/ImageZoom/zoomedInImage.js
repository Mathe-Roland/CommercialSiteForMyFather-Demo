import React, { useState } from 'react';
import './ImageZoom.css';
import { cloudinaryTransformation } from '../functions/regexconversion';

const ImageZoom = ({ imageUrl }) => {
  const [hoveredImageStyle, setHoveredImageStyle] = useState({});
  const [zoomedStyle, setZoomedStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const handleImageHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if the mouse is within the boundaries of the first image
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setHoveredImageStyle({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        outlineOffset: `-${x}px -${y}px`,
      });

      setZoomedStyle({
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: `-${x}px -${y}px`,
        backgroundSize: '200% 200%',
        width: "400px",
      });

      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  };

  const handleImageLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="image-container" onMouseMove={handleImageHover} onMouseLeave={handleImageLeave}>
      <div className="hovered-image" style={hoveredImageStyle}></div>
      {isHovered && <div className="zoomed-image" style={zoomedStyle}></div>}
      <img src={cloudinaryTransformation(imageUrl,250,250)} className='zoomedImageMaxWidth' alt="Image"   loading="lazy"/>
    </div>
  );
};

export default ImageZoom;
