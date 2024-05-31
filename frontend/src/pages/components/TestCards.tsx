import React from "react";
import { FaStar } from "react-icons/fa";
import logo from "../../images/abhyudaylogo1.png";
import { CgHello } from "react-icons/cg";

type Props = {
  image: string,
  name: string,
  details: string,
};

const Testcards = ({ image, name, details }: Props) => {
  return (
    <div className="p-6 m-4 bg-[#592CA1] h-[80vh] sm:h-[60vh] md:h-[75vh] lg:h-[60vh]">
      {/* <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-md" /> */}
      <div className="flex items-center space-x-2 mt-4">
        {/* <h3 className="text-xl font-semibold">{name}</h3> */}
        <FaStar className="w-4 h-4 text-yellow-500" />
        <FaStar className="w-4 h-4 text-yellow-500" />
        <FaStar className="w-4 h-4 text-yellow-500" />
        <FaStar className="w-4 h-4 text-yellow-500" />
      </div>
      <p className="mt-4 text-white text-pretty">{details}</p>

      <div className="flex mt-8 items-center space-x-4">
        <div>
          <img src={logo} alt="Logo" width={96} height={76} />
        </div>
        <div>
          <div
            data-aos="fade-left"
            className="flex items-center space-x-3 px-6 py-2 w-fit rounded-full border-2 border-gray-300"
          >
            <CgHello className="w-6 h-6 text-yellow-300" />
            <span className="text-xs md:text-lg text-white font-semibold text-opacity-70">
              {name}
            </span>
          </div>
          <p className="mt-[0.3rem] text-[15px] text-white">hii</p>
        </div>
      </div>
    </div>
  );
};

export default Testcards;
