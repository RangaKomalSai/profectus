import React from "react";
import styled from "styled-components";
import manasvi from "../../images/manasvi.jpg";
import sunny from "../../images/sunny.jpg";
import { FaEnvelope, FaLinkedin, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading.tsx";
import { Element } from "react-scroll";

const CampaignsContainer = styled.div`
  background: radial-gradient(
      circle 500px at right top,
      rgba(35, 121, 171, 0.5),
      transparent
    ),
    #0c0c2e;
  color: white;
  position: relative;
  overflow: hidden;
`;

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  max-width: 80rem;
  text-align: center;
  margin-top: 120px;
  margin-bottom: 80px;
`;

const Cols = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Col = styled.div`
  width: calc(30% - 2rem);
  margin: 3rem 3rem 0 3rem;
  cursor: pointer;
`;

const ProfileCard = styled.div`
  position: relative;
  font-family: sans-serif;
  width: 220px;
  height: 220px;
  background: #fff;
  padding: 1.5rem;
  border-radius: 50%;
  box-shadow: 0 0 22px #3336;
  transition: 0.6s;
  margin: 0px;
  &:hover {
    border-radius: 10px;
    height: 300px;
    & > div {
      transform: translateY(-60px);
    }
    img {
      border-radius: 10px;
    }
  }
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  transition: 0.6s;
  z-index: 99;

  img {
    width: 100%;
    border-radius: 50%;
    box-shadow: 0 0 22px #3336;
    transition: 0.6s;
  }
`;

const Caption = styled.div`
  text-align: center;
  transform: translateY(-50px);
  opacity: 0;
  transition: 0.6s;

  ${ProfileCard}:hover & {
    margin-top: 2px;
    opacity: 1;
  }

  p {
    font-size: 15px;
    color: #0c52a1;
    font-family: sans-serif;
    margin: 2px 0 9px 0;
  }

  h4 {
    color: black;
    font-family: "Lato", sans-serif, cursive;
  }

  .social-links {
    a {
      color: #333;
      margin-right: 15px;
      font-size: 21px;
      transition: 0.6s;

      &:hover {
        color: #0c52a1;
      }
    }
  }
`;

const Name = styled.h3`
  font-size: 21px;
  font-family: "Nunito", sans-serif;
  margin-top: 0.75em;
`;

const Campaigns = () => {
  return (
    <Element name="contact" id="contact">
      <CampaignsContainer>
        <Wrapper>
          <section>
            <SectionHeading heading="CONTACT US" />
            <Cols>
              <Col>
                <div className="container">
                  <div
                    className="front"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <ProfileCard>
                      <ImgContainer>
                        <img src={manasvi} alt="Manasvi" />
                      </ImgContainer>
                      <Caption>
                        <p>Events Manager</p>
                        <h4 className=" font-lato">7021920836</h4>
                        <div className="social-links flex pt-2 pb-2 justify-center">
                          <Link
                            to="mailto:manasvi.abhyuday@gmail.com"
                            target="_blank"
                          >
                            <FaEnvelope />
                          </Link>
                          <Link
                            to="https://www.linkedin.com/in/manasvi-kushwaha-32191a265/"
                            target="_blank"
                          >
                            <FaLinkedinIn />
                          </Link>
                        </div>
                      </Caption>
                    </ProfileCard>
                    <Name>Manasvi</Name>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="container">
                  <div
                    className="front"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <ProfileCard>
                      <ImgContainer>
                        <img src={sunny} alt="Manasvi" />
                      </ImgContainer>
                      <Caption>
                        <p>Events Manager</p>
                        <h4 className=" font-lato">8852895497</h4>
                        <div className="social-links flex pt-2 pb-2 justify-center">
                          <Link
                            to="mailto:sunnygodara.abhyuday@gmail.com"
                            target="_blank"
                          >
                            <FaEnvelope />
                          </Link>
                          <Link
                            to="http://linkedin.com/in/sunny-godara-97b795279"
                            target="_blank"
                          >
                            <FaLinkedinIn />
                          </Link>
                        </div>
                      </Caption>
                    </ProfileCard>
                    <Name>Sunny</Name>
                  </div>
                </div>
              </Col>
            </Cols>
          </section>
        </Wrapper>
      </CampaignsContainer>
    </Element>
  );
};

export default Campaigns;
