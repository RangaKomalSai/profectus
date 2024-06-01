import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";

type Props = {
  image: string;
  name: string;
  price: number;
  description: string;
  category: string;
  isAdded: boolean;
  preferenceNumber: number | null;
  handleAddToPreference: (name: string) => void;
};

const Cards: React.FC<Props> = ({
  image,
  name,
  price,
  description,
  category,
  isAdded,
  preferenceNumber,
  handleAddToPreference,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Prevent background scrolling when popup is open
  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPopupOpen]);

  return (
    <>
      <Tilt className="parallax-effect" perspective={5000}>
        <div
          className="bg-gray-200 rounded-lg p-6 w-full"
          // data-aos="fade-right"
          data-aos-anchor-placement="top-center"
          data-aos-delay="200"
        >
          <div>
            <img
              src={image}
              alt="Food Image"
              className="mx-auto mt-8 mb-8 border-2 border-gray-900 rounded-lg"
            />
          </div>
          <h1 className="text-center font-semibold capitalize text-xl">
            {name}
          </h1>
          <p className="text-center text-black text-opacity-70 mt-5 mb-5">
            {description}
          </p>
          <p className="text-center text-black text-base">{price}</p>
          <p className="text-center text-black text-base">{category}</p>
          <div className="flex justify-center items-center h-full space-x-4">
            <button
              onClick={togglePopup}
              className="bg-orange-600 relative h-10 w-32 md:h-12 md:w-40 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 before:hover:w-40 hover:before:opacity-80"
            >
              <span className="relative z-100">Read More</span>
            </button>
            <button
              onClick={() => handleAddToPreference(name)}
              className={`relative h-10 w-32 md:h-12 md:w-40 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 ${
                isAdded
                  ? "bg-red-600 hover:text-white hover:shadow-red-600"
                  : "bg-blue-600 hover:text-white hover:shadow-blue-600"
              }`}
            >
              <span className="relative z-100">
                {isAdded ? "Remove" : "Add to Preference"}
              </span>
            </button>
          </div>
          {isAdded && preferenceNumber !== null && (
            <p className="text-center text-black text-base mt-4">
              Preference Number: {preferenceNumber}
            </p>
          )}
        </div>
      </Tilt>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg mx-auto relative mt-[25vh] overflow-y-auto max-h-[80vh] mb-32 custom-scrollbar">
            <button
              onClick={togglePopup}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <div>
              <img
                src={image}
                alt="Food Image"
                className="mx-auto mt-8 mb-8 border-2 border-gray-900 rounded-lg"
              />
            </div>
            <h1 className="text-center font-semibold capitalize text-xl">
              {name}
            </h1>
            <ul>
              <li>
                <p className="text-md pb-2 text-black font-bold mt-5 mb-5">
                  Job Description: {description}
                </p>
              </li>
              <li>
                <p className="text-md pb-2 text-black font-bold mt-5 mb-5">
                  Price: {price}
                </p>
              </li>
              <li>
                <p className="text-md pb-2 text-black font-bold mt-5 mb-5">
                  Category: {category}
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;
