import React from "react";
import ngo from "../../images/ngo.png";
import sd from "../../images/development.png";
import eco from "../../images/ecosystem.png";
import why from "../../images/Group_18.png";
import { Element } from "react-scroll";

const About = () => {
  return (
    <Element
      className="pt-2 pb-16"
      style={{
        background:
          "radial-gradient(circle 500px at right bottom, rgba(35, 121, 171, 0.5), transparent), radial-gradient(circle 500px at left top, rgba(35, 121, 171, 0.5), transparent), #0C0C2E",
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
        <div className="order-2 lg:order-1">
          <h1 className="text-2xl md:text-3xl font-outfit font-semibold text-white">
            {" "}
            WHY PROFECTUS?
          </h1>
          <p className="mt-4 text-base text-[#f1f1f2] text-opacity-85 font-poppins text-pretty">
            Abhyuday’s Profectus fellowship program offers youth the opportunity
            to work with NGOs, social startups and IIT Bombay alumni on
            impactful social projects. Fellows gain valuable insights,
            contribute to society through tasks like communication, impact
            analysis and fundraising. Guided by experienced social workers and
            leaders, they develop essential skills, knowledge, and networks to
            become effective community change agents.
          </p>

          <div className="mt-8 flex items-center space-x-8">
            <div
              data-aos="fade-up"
              className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-col flex-shrink-0"
            >
              <img
                src={ngo}
                alt="Transformative Opportunities"
                width={36}
                height={36}
                className="rounded-lg -rotate-12"
              />
            </div>
            <div>
              <h1
                data-aos="zoom-in"
                // data-aos-anchor-placement="top-center"
                // data-aos-delay="200"
                className="text-lg md:text-xl font-extrabold text-[#f1f1f2] font-nunito text-pretty"
              >
                Transformative Opportunities
              </h1>
              <p
                data-aos="zoom-in"
                className="mt-2 text-base text-[#f1f1f2] text-opacity-75 font-nunito text-pretty"
              >
                Getting Engaged with NGOs, Social Startups, and Alumni
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center space-x-8">
            <div
              data-aos="fade-up"
              className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-col flex-shrink-0"
            >
              <img
                src={sd}
                alt="Skill Development"
                width={36}
                height={36}
                className="rounded-lg -rotate-12"
              />
            </div>
            <div>
              <h1
                data-aos="zoom-in"
                // data-aos-anchor-placement="top-center"
                // data-aos-delay="400"
                className="text-lg md:text-xl font-extrabold text-[#f1f1f2] font-nunito text-pretty"
              >
                Skill Development and Mentorship
              </h1>
              <p
                data-aos="zoom-in"
                className="mt-2 text-base text-[#f1f1f2] text-opacity-75 font-nunito text-pretty"
              >
                Guided Growth Towards Impactful Leadership
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center space-x-8">
            <div
              data-aos="fade-up"
              className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-col flex-shrink-0"
            >
              <img
                src={eco}
                alt="Creating Sustainable Change"
                width={36}
                height={36}
                className="rounded-lg -rotate-12"
              />
            </div>
            <div>
              <h1
                data-aos="zoom-in"
                // data-aos-anchor-placement="top-center"
                // data-aos-delay=""
                className="text-lg md:text-xl font-extrabold text-[#f1f1f2] font-nunito text-pretty"
              >
                Creating Sustainable Change
              </h1>
              <p
                data-aos="zoom-in"
                className="mt-2 text-base text-[#f1f1f2] text-opacity-75 font-nunito text-pretty"
              >
                Getting Involved in Communication to Fundraising, Making a
                Difference
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto lg:-mx-0 mb-8 lg:mb-0">
          <img
            src={why}
            alt="Why Profectus"
            width={596}
            height={576}
            className="rounded-lg "
          />
        </div>
      </div>
    </Element>
  );
};

export default About;
