import React from "react";
import { FaStar } from "react-icons/fa";
import logo from "../../images/abhyudaylogo1.png";
import { CgHello } from "react-icons/cg";
import { ImQuotesLeft } from "react-icons/im";

type Props = {
  image: string;
  company: string;
  dept: string;
  name: string;
  details: string;
};

const Testcards = ({ image, company, dept, name, details }: Props) => {
  return (
    <div className="p-6 m-4 bg-[#592CA1] h-[80vh] sm:h-[60vh] md:h-[75vh] lg:h-[70vh] overflow-hidden flex flex-col justify-around 300px:h-[70vh] 400px:h-[55vh] rounded-lg">
      {/* <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-md" /> */}
      <div className="flex justify-between items-center">
        <div
          data-aos="fade-left"
          className="flex items-center px-2 rounded-full border-spacing-1 border border-gray-300 h-10"
        >
          <span className="text-[16px] md:text-lg p-2 text-white font-semibold text-opacity-70">
            {company}
          </span>
        </div>
        <ImQuotesLeft className="text-6xl text-white" />
      </div>
      <p className="mt-4 text-white text-pretty text-sm md:text-[13px]">
        {details}
      </p>

      <div className="flex mt-2 md:mt-8 items-center space-x-4 mb-10">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={image} alt="Logo" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col">
          <div className="font-bold font-outfit">{name}</div>
          <div className="font-bold font-outfit text-white text-opacity-70">
            {dept}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testcards;
