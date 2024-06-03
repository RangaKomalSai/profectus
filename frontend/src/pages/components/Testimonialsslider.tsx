import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Testcards from "./TestCards.tsx";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1324, min: 764 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Testimonialsslider = () => {
  return (
    <div data-aos="zoom-in">
      <Carousel
        additionalTransfrom={0}
        arrows={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        centerMode={false}
        infinite
        responsive={responsive}
        itemClass="item"
      >
        <Testcards
          image="path/to/image1.jpg"
          name="Abhyuday"
          details="Hi, I'm Sahiti. Joining the &nbsp;   Profectus  &nbsp;   internship  &nbsp;  at &nbsp;   Abhyuday was really good. &nbsp;   I worked with [Company Name], making a  &nbsp;   database system that  &nbsp;   helped them a  &nbsp;  lot.  &nbsp;  The environment at  &nbsp;   Abhyuday  &nbsp;   was  &nbsp;  very  &nbsp;   nice and  &nbsp;   supportive. &nbsp;   The  &nbsp;  mentors  &nbsp;   helped  &nbsp;   us all  &nbsp;  the time, and  &nbsp;  it was  &nbsp;  very useful. I  &nbsp;  learned  &nbsp;   so much  &nbsp;   and felt  &nbsp;   good  &nbsp;   because our  &nbsp;  work made  &nbsp;   a big difference  &nbsp;   for  &nbsp;  the company. &nbsp;   If you want an  &nbsp;   internship that helps your  &nbsp;   career and also makes you  &nbsp;   feel proud of your work,  &nbsp;  I think you should join the  &nbsp;  Profectus program at Abhyuday. &nbsp;   It was a really great &nbsp;   experience for me."
        />
        <Testcards
          image="path/to/image2.jpg"
          name="Kinjal Sao"
          details="Participating  &nbsp;   in the Profectus internship at Abhyuday was an extraordinary experience! &nbsp;   I collaborated with Frontier, &nbsp;   focusing on their strategy for expanding internationally.  &nbsp;   Our team conducted detailed research and crafted strategic plans that significantly aided their growth.  &nbsp;  The environment was extremely supportive,  &nbsp;  which greatly enhanced my learning. &nbsp;   Seeing our efforts positively impact the company was deeply rewarding.  &nbsp;  For anyone seeking an internship that  &nbsp;  is both enjoyable and professionally enriching,  &nbsp;  I wholeheartedly recommend the Profectus program  &nbsp;  at Abhyuday. 
"
        />
        <Testcards
          image="path/to/image3.jpg"
          name="Abhyuday"
          details="Isha Singh here! Participating in the Profectus internship at Abhyuday was a game-changer for me. This experience was packed with learning opportunities—from in-depth market analysis to strategic planning. The mentorship provided was exceptional, encouraging me to stretch my capabilities and enhancing my professional skills. It was incredibly fulfilling to see the practical impact of our strategies. If you’re looking for an internship that offers real growth and learning in a supportive environment,This program truly prepares you for a successful career.
"
        />
        <Testcards image="path/to/image4.jpg" name="Abhyuday" details="" />
      </Carousel>
    </div>
  );
};

export default Testimonialsslider;
