import React, { useState, useEffect, useCallback, MouseEvent } from "react";
import Tilt from "react-parallax-tilt";

type Props = {
  image: string;
  name: string;
  job_title: string;
  description: string;
  domain: string;
  mode: string;
  number_of_fellows: number | null;
  stipend: string;
  website_link: string;
  city: string;
  isAdded: boolean;
  preferenceNumber: number | null;
  handleAddToPreference: (name: string) => void;
};

const Cards: React.FC<Props> = ({
  image,
  name,
  job_title,
  description,
  domain,
  mode,
  number_of_fellows,
  stipend,
  website_link,
  city,
  isAdded,
  preferenceNumber,
  handleAddToPreference,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleClosePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPopupOpen(false);
      }
    },
    [setIsPopupOpen]
  );

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPopupOpen, handleKeyDown]);

  const handleBackgroundClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        setIsPopupOpen(false);
      }
    },
    [setIsPopupOpen]
  );

  return (
    <>
      <Tilt className="parallax-effect" perspective={5000}>
        <div
          className="bg-gray-200 rounded-lg p-6 w-full"
          data-aos-anchor-placement="top-center"
          data-aos-delay="200"
        >
     <div>
  <img
    src={image}
    alt="Image"
    className="mx-auto mt-8 mb-8 border-2 border-gray-900 rounded-lg w-32 h-32" // Adjust width and height as needed
  />
</div>

<h1 className="text-center font-outfit font-bold capitalize text-xl whitespace-nowrap overflow-hidden">
  {/* <span className="whitespace-nowrap overflow-hidden "> */}
    {name}
</h1>

          <p className="text-center text-black text-base whitespace-nowrap overflow-hidden">{job_title}</p>
          <div className="flex flex-col md:flex-row justify-center md:justify-between">
  <div className="text-center text-black text-base md:mr-8">
    <span className="text-l font-semibold text-black">Domain:</span>
    <span className="whitespace-nowrap overflow-hidden overflow-ellipsis text-black">
      {domain}
    </span>
  </div>
  <div className="text-center text-black text-base lg:mr-5 mt-0 sm:mt-0 md:mt-0 md:ml-2">
    <span className="text-l font-semibold text-black">Mode:</span>
    <span className="whitespace-nowrap overflow-hidden overflow-ellipsis text-black">
      {mode}
    </span>
  </div>
</div>





          <div className="flex justify-center items-center h-full space-x-4">
            <button
              onClick={togglePopup}
              className="bg-[#f58b11] relative h-10 w-32 md:h-12 md:w-40 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 before:hover:w-40 hover:before:opacity-80"
            >
              <span className="relative z-100 font-roboto">Read More</span>
            </button>
            <button
              onClick={() => handleAddToPreference(name)}
              className={`relative h-10 w-32 md:h-12 md:w-40 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 ${
                isAdded
                  ? "bg-red-600 hover:text-white hover:shadow-red-600"
                  : "bg-[#4255b3] hover:text-white hover:shadow-[#1f4561]"
              }`}
            >
              <span className="relative z-100 text-sm md:text-base text-wrap font-roboto">
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
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleBackgroundClick}
        >
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
                alt="Image"
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
                  Job Title: {job_title}
                </p>
              </li>
              <li>
                <p className="text-md pb-2 text-black font-bold mt-5 mb-5">
                  Domain: {domain}
                </p>
              </li>
              <li>
                <p className="text-md pb-2 text-black font-bold mt-5 mb-5">
                  Mode: {mode}
                </p>
              </li>
              <li>
                <p className="text-md pb-2 text-black font-bold mt-5 mb-5">
                  Number of Fellows: {number_of_fellows}
                </p>
              </li>
              <li>
                <p className="text-md pb-2 text-black font-bold mt-5 mb-5">
                  Stipend: {stipend}
                </p>
              </li>
              <li>
                <p className="text-md pb-2 text-black font-bold mt-5 mb-5">
                  Website Link: <a href={website_link} target="_blank" rel="noopener noreferrer">{website_link}</a>
                </p>
              </li>
              <li>
                <p className="text-md pb-2 text-black font-bold mt-5 mb-5">
                  City: {city}
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
