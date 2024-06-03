import React, { useState } from "react";
import DashNav from "./DashNav.tsx";
import MobileDashNav from "./MobileDashNav.tsx";

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);

  const showNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);

  return (
    <div>
      <DashNav openNav={showNavHandler} />
      <MobileDashNav showNav={showNav} closeNav={closeNavHandler} />
    </div>
  );
};

export default ResponsiveNav;
