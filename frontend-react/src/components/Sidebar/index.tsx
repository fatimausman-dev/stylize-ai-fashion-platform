import React, { useState } from "react";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import { MdDashboard} from "react-icons/md";
import { Link } from "react-router-dom";

interface Props {
  sidebarItems: {
    title: string;
    link: string;
    icon?: React.ReactNode;
    badge?: number;
    submenu?: boolean;
    subItems?: { title: string; link: string }[];
    spacing?: boolean;
  }[];
}

export const Sidebar: React.FC<Props> = ({ sidebarItems }) => {

  const [showSidebar, setShowSidebar] = useState(true);
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={`bg-light border-t-8 rounded-br-3xl rounded-tr-3xl p-5 pt-8 shadow-md shadow-gray border-light duration-300 relative ${
          showSidebar ? "w-72" : "w-20"
        }`}
      >
        <BsArrowLeftShort
          className={`bg-deepblue text-light text-3xl rounded-full absolute -right-3 top-9 border border-deepblue cursor-pointer shadow-md shadow-deepblue
          ${!showSidebar && "rotate-180"}  
        `}
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <div className="inline-flex">
          <span className="text-deepblue text-4xl block float-left mr-2">
            <MdDashboard />
          </span>
          <h1
            className={`text-2xl origin-left font-small text-deepblue duration-300 ${
              !showSidebar && "scale-0"
            }`}
          >
            Dashboard
          </h1>
        </div>
        <ul className="pt-2">
          {sidebarItems.map((item, index) => (
            <>
              <li
                key={index}
                className={`text-deepblue text-small flex items-center gap-x-4 p-2 cursor-pointer rounded-md
              hover:bg-deepblue hover:bg-opacity-10 hover:text-darker '
              ${item.spacing ? "mt-9" : "mt-2"}`}
              >
                <Link to={item.link}>
                  <span className="text-2xl block float-left mr-4">
                    {item.icon ? item.icon : <MdDashboard />}
                  </span>
                  <span
                    className={`text-base font-medium flex-1 duration-200 ${
                      !showSidebar && "hidden"
                    }`}
                  >
                    {item.title}
                  </span>
                  {showSidebar && item.badge && item.badge !== 0 ? (
                    <span className="absolute right-0 mr-7 bg-deepblue bg-opacity-20 text-deepblue rounded-full py-1 px-2 font-semibold text-xs">
                      {item.badge}
                    </span>
                  ):
                  null
                  }
                </Link>
                {item.submenu && showSidebar && (
                  <BsChevronDown
                    className={`absolute right-0 mt-1 mr-8 ${
                      showSubmenu && "rotate-180"
                    }`}
                    onClick={() => setShowSubmenu(!showSubmenu)}
                  />
                )}
              </li>
              {item.submenu && showSubmenu && showSidebar && (
                <ul>
                  {item.subItems && item.subItems.map((subItem, index) => (
                    <li
                      key={index}
                      className={`text-deepblue text-small flex items-center gap-x-4 p-2 px-14 cursor-pointer rounded-md
                      hover:bg-deepblue hover:bg-opacity-10 hover:text-darker `}
                    >
                      <Link to={subItem.link}>
                        <span
                          className={`text-base font-medium flex-1 duration-200 ${
                            !showSidebar && "hidden"
                          }`}
                        >
                          {subItem.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
