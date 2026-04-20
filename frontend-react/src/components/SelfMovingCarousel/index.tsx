import React, { useState, useEffect } from 'react';

interface Props {
  items: { image: string; alt: string }[];
  interval?: number;
}

export const SelfMovingCarousel: React.FC<Props> = ({ items, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex, items.length, interval]);

  return (
    <div className="relative overflow-hidden bg-black">
      <div className="flex absolute transition-transform ease-in-out duration-1000" style={{ transform: `translateX(-${currentIndex * (22)}rem)` }}>
        {items.map((item, index) => (
          <div key={index} className="w-20 h-20 mr-8">
            <img src={item.image} alt={item.alt} className="w-full h-full" />
          </div>
        ))}
        {/* Duplicate the images for continuous flow */}
        {items.map((item, index) => (
          <div key={`duplicate-${index}`} className="w-20 h-20 mr-8">
            <img src={item.image} alt={item.alt} className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelfMovingCarousel;
