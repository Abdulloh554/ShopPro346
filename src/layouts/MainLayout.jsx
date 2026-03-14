import React from "react";
import { NavLink } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { IoHeartCircle } from "react-icons/io5";

function MainLayout() {
  return (
    <>
      <header>
        <div>
          <div>
            <NavLink to="/">Logo</NavLink>
          </div>
          <nav>
            <NavLink to="">Contact</NavLink>
            <NavLink to="">About Us</NavLink>
            <NavLink to="">
              <IoHeartCircle style={{ fontSize: "40px", color: "blue" }} />
            </NavLink>
            <NavLink to="">
              <FaCartPlus style={{ fontSize: "40px", color: "red" }} />
            </NavLink>
            <NavLink to="">Login</NavLink>
          </nav>
        </div>
      </header>
    </>
  );
}

export default MainLayout;
