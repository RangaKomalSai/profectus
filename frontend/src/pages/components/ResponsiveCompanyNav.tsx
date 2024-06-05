import React, { useState } from "react";
import CompanyNav from "./CompanyNav.tsx";
import MobileCompanyNav from "./MobileCompanyNav.tsx";

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);

  const showNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);

  return (
    <div>
      <CompanyNav openNav={showNavHandler} />
      <MobileCompanyNav showNav={showNav} closeNav={closeNavHandler} />
    </div>
  );
};

export default ResponsiveNav;
