import React from "react";

type Props = {
  heading: string;
};

const SectionHeading: React.FC<Props> = ({ heading }) => {
  return (
    <div className="text-center" data-aos="zoom-in">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-white-1000 font-semibold font-outfit text-pretty tracking-wide">
        {heading}
      </h1>
      <p className="w-11/12 sm:w-10/12 md:w-3/5 lg:w-1/2 text-sm md:text-base mt-4 mx-auto text-gray-500 text-opacity-70 font-medium"></p>
    </div>
  );
};

export default SectionHeading;
