import React from "react";
import about from "../../images/Group_20.png";
import { Element } from "react-scroll";

const About1 = () => {
  return (
    <Element
      name="about"
      className="pt-2 pb-8 lg:pb-16"
      id="about"
      style={{
        background:
          "radial-gradient(circle 500px at right top, rgba(35, 121, 171, 0.5), transparent), radial-gradient(circle 500px at left bottom, rgba(35, 121, 171, 0.5), transparent), #0C0C2E",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        data-aos="zoom-in"
        data-aos-anchor-placement="top-center"
        className="w-4/5 mx-auto items-center mt-12 md:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        <div className="mx-auto lg:-mx-0 mb-8 lg:mb-0">
          <img
            src={about}
            alt="Why Profectus"
            width={496}
            height={476}
            className="rounded-lg -rotate-12"
          />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold font-outfit text-white">
            {" "}
            ABOUT PROFECTUS
          </h1>
          <p className="mt-4 text-base text-[#f1f1f2] text-opacity-85 font-poppins text-pretty">
            Abhyuday IIT Bombay's Profectus fellowship programme enables young
            people to use social service to change the world. Enrol now to take
            advantage of fantastic summer internship opportunities in the social
            sector and help bring about positive change.
          </p>
        </div>
      </div>
    </Element>
  );
};

export default About1;
