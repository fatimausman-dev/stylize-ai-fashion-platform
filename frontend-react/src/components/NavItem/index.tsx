import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Button, Modal } from "..";
import { useState } from "react";

interface Props {
  children: any;
  link: any;
  style?: string;
}

export const NavItem: React.FC<Props> = ({ children, link, style }) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const handleNo = () => {
    setModal(false);
  };

  const handleYes = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  if (link.includes("!")) {
    return (
      <>
        <p
          key={link}
          onClick={() => setModal(true)}
          className={`block text-white hover:text-lightpurple cursor-pointer ${style}`}
        >
          {children}
        </p>
        <div className="">
          <Modal
            style="w-30"
            isOpen={modal}
            onClose={() => {
              setModal(false);
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-lg font-medium text-center mb-4">
                Are you sure you want to logout?
              </h1>
              <div className="flex space-x-4">
                <Button style="px-4 py-2 rounded-md" onClick={handleYes}>
                  Yes
                </Button>
                <Button style="px-4 py-2 rounded-md" onClick={handleNo}>
                  No
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </>
    );
  } else if (link && !link.includes("/")) {
    return (
      <li className="group hover:cursor-pointer">
        <ScrollLink
          key={link}
          to={link}
          spy
          smooth
          offset={-100}
          className={`relative block text-light ${style}`}
        >
          {children}
          <span
            className="absolute inset-x-0 bottom-0 h-0.5 bg-purple
                          transform scale-x-0 transition-transform duration-300 
                          group-hover:scale-x-100"
          ></span>
        </ScrollLink>
      </li>
    );
  } else {
    return (
      <Link
        key={link}
        to={link}
        className={`block hover text-white hover:text-lightpurple cursor-pointer ${style}`}
      >
        {children}
      </Link>
    );
  }
};

export default NavItem;


