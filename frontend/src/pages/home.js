import React from "react";
import { ReactComponent as Logo } from "../images/logo.svg";

function Home() {
  return (
    <div className="" style={{ backgroundColor: "#0C0C2E" }}>
      <div
        className="min-h-16 max-h-24 flex justify-between items-center px-8 py-2"
        style={{ backgroundColor: "#0C0C2E" }}
      >
        <Logo className="w-52" />
        <div>
          <nav>
            <ul className="flex space-x-4 text-white text-xl">
              <li>Home</li>
              <li>About</li>
              <li>Rules</li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="font-calistoga text-8xl text-white">PROFECTUS</div>
    </div>
  );
}

export default Home;
