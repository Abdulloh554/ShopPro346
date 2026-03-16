import { NavLink, Outlet } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { IoHeartCircle } from "react-icons/io5";
import Logo from "../assets/vite.png";

function MainLayout() {
  return (
    <>
      <header>
        <div className="flex justify-between px-[80px] py-[30px] shadow-xl ">
          <div>
            <NavLink to="/home"><img src={Logo} alt="" /></NavLink>
          </div>
          <nav className="flex gap-[30px]">
            <NavLink className="hover:text-indigo-400 duration-300 ease-out font-bold " to="/home">Home</NavLink>
            <NavLink className="hover:text-indigo-400 duration-300 ease-out font-bold " to="/contact">Contact</NavLink>
            <NavLink className="hover:text-indigo-400 duration-300 ease-out font-bold " to="/aboutus">About Us</NavLink>
            <NavLink to="/like" className="mt-[-10px]">
              <IoHeartCircle style={{ fontSize: "40px", color: "red" }} />
            </NavLink>
            <NavLink to="/card" className="mt-[-10px]" >
              <FaCartPlus style={{ fontSize: "40px", color: "black" }} />
            </NavLink>
            <NavLink className="hover:text-indigo-400 duration-300 ease-out font-bold" to="/login">Login</NavLink>
          </nav>
        </div>
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  );
}

export default MainLayout;
