import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../images/ecosystem.png";

const ProfileCard = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Make a GET request to fetch the user's profile details
        const response = await axios.get("http://localhost:5000/api/profile", {
          withCredentials: true,
        });
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="flex justify-center items-center pt-[10vh]">
      <div
        data-aos="zoom-in"
        className="flex flex-col justify-center lg:mt-20 items-center mb-8 gap-4 text-center border border-opacity-30 transition-colors duration-500 ease-in-out rounded-lg hover:border-opacity-100 p-6  lg:mt-15 mt-12 bg-white bg-opacity-50"
      >
        {profileData && (
          <>
            <img
              src={logo}
              alt={profileData.name}
              width={150}
              height={150}
              className="rounded-full object-cover"
            />
            <p className="font-semibold font-outfit uppercase text-black">
              {profileData.name}
            </p>
            <span className="text-gray-400 text-sm font-poppins">
              {profileData.department}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-4">
              <div className="w-30">
                <h4 className="font-semibold text-black text-sm font-outfit">
                  Roll No.
                </h4>
                <p className="text-xs mt-2 text-black font-roboto">
                  {profileData.rollNumber}
                </p>
              </div>
              <div className="w-30">
                <h4 className="font-semibold text-black text-sm font-outfit">
                  Year of Study
                </h4>
                <p className="text-xs mt-2 text-black font-roboto">
                  {profileData.year}
                </p>
              </div>
              <div className="w-30">
                <h4 className="font-semibold text-black text-sm font-outfit">
                  Contact
                </h4>
                <p className="text-xs mt-2 text-black font-roboto">
                  {profileData.contactNumber}
                </p>
              </div>
              <div className="w-30">
                <h4 className="font-semibold text-black text-sm font-outfit">
                  Programme
                </h4>
                <p className="text-xs mt-2 text-black font-roboto">
                  {profileData.programmeOfStudy}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
