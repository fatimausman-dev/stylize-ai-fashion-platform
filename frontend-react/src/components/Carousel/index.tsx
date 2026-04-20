import React from "react";

interface Props {
  style?: string;
  error?: string;
  images: string[]; // An array of image URLs
}

export const Carousel: React.FC<Props> = ({ error, images, style }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={`mb-6 ${error ? "mb-8" : ""}`}>
      <div
        id="indicators-carousel"
        className={`relative w-full border border-deepblue rounded-lg ${style}`}
        data-carousel="static"
      >
        <div
          className={`relative h-40 overflow-hidden rounded-lg md:h-72 bg-light`}
        >
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className={`duration-700 ease-in-out ${
                activeIndex === index ? "block" : "hidden"
              }`}
              data-carousel-item={activeIndex === index ? "active" : ""}
            >
              <img
                src={imageUrl}
                className="absolute block w-50 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <div
          className="absolute z-30 -translate-x-1/2 space-x-3 rtl:space-x-reverse
         top-1/2 transform -translate-y-1/2 left-9"
        >
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 cursor-pointer left-0
          bg-lighter hover:bg-lightpurple focus:ring-2 focus:ring-darker focus:outline-none"
            data-carousel-prev
            onClick={handlePrev}
          >
            <svg
              className="w-4 h-4 text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </div>
        <div className="absolute z-30 -translate-x-1/2 space-x-3 rtl:space-x-reverse top-1/2 transform -translate-y-1/2 right-0">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 cursor-pointer
          bg-lighter hover:bg-lightpurple focus:ring-2 focus:ring-darker focus:outline-none"
            data-carousel-next
            onClick={handleNext}
          >
            <svg
              className="w-4 h-4 text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1 ">{error}</p>}
    </div>
  );
};

export default Carousel;
