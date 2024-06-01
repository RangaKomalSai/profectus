import React from "react";
import ResponsiveNav from "./components/ResponsiveNav.tsx";
import Hero from "./components/Hero.js";
import About from "./components/About.js";
import Testimonials from "./components/Testimonials.tsx";
import ContactUs from "./components/ContactUs.js";
import Footer from "./components/Footer.tsx";
// import ProfileCard from "./Dashboard/Rules/ProfileCard";

const Home = () => {
  return (
    <div>
      <ResponsiveNav />
      <Hero />
      <About />
      <Testimonials />
      <ContactUs />
      <Footer />
      {/* <ProfileCard /> */}
    </div>
  );
};

export default Home;
