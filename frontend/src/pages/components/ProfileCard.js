import React from "react";
import logo from "../../images/ecosystem.png";

const ProfileCard = () => {
  return (
    <div className="flex justify-center items-center lg:mt-15 mt-12">
      <div
        data-aos="zoom-in"
        className="flex flex-col justify-center lg:mt-20 items-center mt-8 mb-8 gap-4 text-center border border-opacity-30 transition-colors duration-500 ease-in-out rounded-lg hover:border-opacity-100 p-6"
      >
        <img
          src={logo}
          alt="Hermione Granger"
          width={150}
          height={150}
          className="rounded-full object-cover"
        />
        <p className="font-semibold text-white">Hermione Granger</p>
        <span className="text-gray-400 text-sm">Department</span>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-4">
          <div className="w-30">
            <h4 className="font-semibold text-white text-sm">Roll No.</h4>
            <p className="text-xs mt-2 text-white">22b2509</p>
          </div>
          <div className="w-30">
            <h4 className="font-semibold text-white text-sm">Year of Study</h4>
            <p className="text-xs mt-2 text-white">Third</p>
          </div>
          <div className="w-30">
            <h4 className="font-semibold text-white text-sm">Contact</h4>
            <p className="text-xs mt-2 text-white">9381406475</p>
          </div>
          <div className="w-30">
            <h4 className="font-semibold text-white text-sm">Programme</h4>
            <p className="text-xs mt-2 text-white">UG</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
