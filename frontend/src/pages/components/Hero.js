import React from "react";
import { CiDiscount1 } from "react-icons/ci";
import logo from "../../images/Group_21.png";
import { Element } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <Element
      name="hero"
      id="home"
      className="w-full pt-[12vh] md:pt-[14vh] "
      style={{
        background:
          "radial-gradient(circle 500px at top center, rgba(35, 121, 171, 0.5), transparent), radial-gradient(circle 500px at right bottom, rgba(35, 121, 171, 0.5), transparent), #0C0C2E",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="flex justify-center flex-col w-4/5 h-full mx-auto">
        <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div>
            <div
              data-aos="fade-left"
              className="flex items-center space-x-3 px-6 py-2 w-fit rounded-full border-2 border-gray-300"
            >
              <CiDiscount1 className="w-6 h-6 text-yellow-300" />
              <span className="text-xs md:text-lg text-white font-semibold text-opacity-70">
                Inspiring Individuals, Transforming Communities
              </span>
            </div>

            <h1
              data-aos="fade-right"
              data-aos-delay="200"
              className="text-5xl md:text-5xl lg:text-[85px] xl:text-[85px] relative z-[1] md:leading-[4.5rem] leading-[3rem] mt-4 text-white font-bold mb-4 md:mb-8 inline-block font-poppins"
            >
              Profectus
              <br />
              <span className="absolute bottom-4 z-[-1] -rotate-12 left-0 w-full h-3 bg-orange-400 bg-opacity-50 rounded-full "></span>{" "}
            </h1>
            <p
              data-aos="fade-left"
              data-aos-delay="400"
              className="mt-4 text-xs md:text-xl text-white font-nunito text-pretty"
            >
              Abhyuday IIT Bombay's Profectus fellowship programme enables young
              people to use social service to change the world. Enrol now to
              take advantage of fantastic summer internship opportunities in the
              social sector and help bring about positive change.
            </p>
            <button
              onClick={handleClick}
              data-aos="fade-right"
              data-aos-delay="200"
              className="bg-orange-600 relative h-10 w-32 md:h-12 md:w-40 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 before:hover:w-40 hover:before:opacity-80 mt-4"
            >
              <span className="relative z-100 font-bold font-nunito tracking-wider text-sm">
                REGISTER NOW
              </span>
            </button>
          </div>
          <div data-aos="fade-right" data-aos-delay="600" className="mx-auto">
            <img
              src={logo}
              alt="Logo"
              width={1730.5}
              height={1081}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Element>
  );
};

export default Hero;
