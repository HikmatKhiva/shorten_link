import { navLinks } from "../constant";
import { NavLink } from "react-router-dom";
import HeaderDropDown from "./HeaderDropDown";
const Header = () => {
  return (
    <header className="shadow h-[60px] flex items-center border-b bg-primary-blue text-white">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-xl">
          Logo
        </NavLink>
        <nav className="flex items-center gap-x-5 relative">
          <ul className="flex items-center gap-x-5 list-none">
            {navLinks.map((link) => {
              return (
                <li key={link.id}>
                  <NavLink
                    className={({ isActive }) => (isActive ? "underline" : "")}
                    to={link.path}
                  >
                    {link.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <HeaderDropDown />
        </nav>
      </div>
    </header>
  );
};
export default Header;
