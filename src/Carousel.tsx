import { useState } from "react";


const images : string[] = [
    "https://images.pexels.com/photos/45923/pexels-photo-45923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/10901851/pexels-photo-10901851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/19383822/pexels-photo-19383822/free-photo-of-red-double-decker-on-oxford-street-in-london-at-night.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/7245319/pexels-photo-7245319.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/19736357/pexels-photo-19736357/free-photo-of-london-bus-on-road-towards-big-ben.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex + 1 === images.length ? 0 : prevIndex + 1
      );
    };
    const handlePrevious = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
      );
    };
    const handleDotClick = (index : number) => {
      setCurrentIndex(index);
    };
    return (
    <div className="carousel-images">
        <img
          key={currentIndex}
          src={images[currentIndex]}
        /><div className="slide_direction">
        <div className="left" onClick={handlePrevious}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 96 960 960"
            width="20"
          >
            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
          </svg>
        </div>
        <div className="right" onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 96 960 960"
            width="20"
          >
            <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
          </svg>
        </div>
      </div>
      <div className="indicator">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
    );
}



export default Carousel;