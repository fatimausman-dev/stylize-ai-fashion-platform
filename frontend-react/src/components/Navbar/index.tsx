import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavItem } from "..";

interface Props {
  style?: string
  navItems?: { link: string; path: string; icon?: React.ReactNode }[];
  navItemsRight?: { link: string; path: string; icon?: React.ReactNode }[];
}

export const Navbar: React.FC<Props> = ({ navItems, navItemsRight, style }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={`md:px-14 p-4 max-w-screen-2xl mx-auto shadow-xl bg-deepblue fixed right-0 top-0 left-0 z-50 ${style}`}>
        <div className="text-lg container mx-auto flex justify-between items-center font-medium">
          <div className="flex space-x-14 items-center">
            <a
              href="/"
              className="text-2xl font-semibold flex items-center space-x-3 text-Navyblue"
            >
              <span className=" inline-block items-center text-white">
                Stylize
              </span>
            </a>
            {/* showing nav items using map */}
            <ul className="md:flex space-x-6 hidden">
              {navItems &&
                navItems.map(({ link, path }) => (
                  <NavItem key={path} link={path}>
                    {link}
                  </NavItem>
                ))}
            </ul>
          </div>
          {/* Right side items */}
          <div className="space-x-4 hidden md:flex items-center text-light">
            {navItemsRight &&
              navItemsRight.map(({ link, path, icon }) => (
                <NavItem
                  key={path}
                  link={path}
                  style="block hidden sm:flex text-medium items-center 
                  hover:text-lightpurple cursor-pointer"
                >
                  <>
                    <span className="text-2xl block float-left mr-2">
                      {icon ? icon : null}
                    </span>
                    {link}
                  </>
                </NavItem>
              ))}
          </div>
          {/* show menu button on phone */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-light focus:outline-none focus:text-lightpurple"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6 text-light" />
              ) : (
                <FaBars className="w-6 h-6 text-light" />
              )}
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`space-y-2 px-4 pt-20 pb-5 bg-deepblue md:hidden text-light text-medium ${
          isMenuOpen ? "block fixed top-0 right-0 left-0 z-40" : "hidden"
        }`}
      >
        <hr className="border-lightpurple -mt-4 mb-4" />
        {navItems &&
          navItems.map(({ link, path }) => (
            <NavItem key={path} link={path}>
              {link}
            </NavItem>
          ))}
        {navItems && <hr className="border-lightpurple" />}
        {navItemsRight &&
          navItemsRight.map(({ link, path, icon }) => (
            <NavItem
              key={path}
              link={path}
              style="block hover text-light hidden sm:flex text-medium items-center 
            hover:text-lightpurple cursor-pointer"
            >
              <>
                <span className="text-2xl block float-left mr-2">
                  {icon ? icon : null}
                </span>
                {link}
              </>
            </NavItem>
          ))}
      </div>
    </>
  );
};

export default Navbar;
