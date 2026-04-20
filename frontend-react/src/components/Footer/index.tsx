import { Link as ScrollLink } from "react-scroll";
import fb from "../../assests/images/fb.png";
import insta from "../../assests/images/insta.png";
import twitter from "../../assests/images/twitter.png";
import linkedin from "../../assests/images/linkedin.png";

export const Footer = () => {
  return (
    <div
      className="bg-deepblue md:px-14 p-4 max-w-screen-2xl text-white"
      id="contact us"
    >
      <div className="my-12 flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 space-y-8">
          <a
            href="/"
            className="text-2xl font-semibold flex items-center space-x-3"
          >
            <span className="inline-block items-center">Stylize</span>
          </a>
          <p className="md:w-1/2">Subscribe for Daily Newsletter!</p>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="your email"
              className="bg-[#9a7af159] py-2 px-4 rounded-md focus:outline-none"
            />
            <input
              type="submit"
              value="Subscribe"
              className="px-4 py-2 bg-purple rounded-md -ml-2 cursor-pointer hover:bg-lightpurple hover:text-deepblue duration-300 transition-all"
            />
          </div>
        </div>
        {/* Footer navigation */}
        <div className="md:w-1/2 flex flex-col md:flex-row flex-wrap gap-20 items-start justify-end">
          <div className="space-y-4 mt-2">
            <h4 className="text-xl">Platform</h4>
            <ul className="space-y-3 cursor-pointer">
              <ScrollLink
                to="home"
                spy
                smooth
                offset={-100}
                className="block hover:text-purple"
              >
                Home
              </ScrollLink>
              <ScrollLink
                to="about"
                spy
                smooth
                offset={-100}
                className="block hover:text-purple "
              >
                About
              </ScrollLink>
              <ScrollLink
                to="card"
                spy
                smooth
                offset={-100}
                className="block hover:text-purple "
              >
                Features
              </ScrollLink>
              <ScrollLink
                to="vendor"
                spy
                smooth
                offset={-100}
                className="block hover:text-purple"
              >
                Vendor
              </ScrollLink>
              <ScrollLink
                to="contact"
                spy
                smooth
                offset={-100}
                className="block hover:text-purple"
              >
                Contact Us
              </ScrollLink>
            </ul>
          </div>
          <div className="space-y-4 mt-2 ">
            <h4 className="text-xl">Contact Us</h4>
            <ul className="space-y-3">
              <p className="block">0333-5658411</p>
              <p className="block">0342-1510007</p>
              <p className="block">stylizemall@gmail.com</p>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col sm:flex-row gap-8 sm:items-center justify-between my-4">
        <p>© Stylize 2023 --- 2023. All rights reserved.</p>
        <div className="flex items-center space-x-5">
          <img
            src={fb}
            alt=""
            className="w-8 cursor-pointer hover:translate-y-4 transition-all duration-300 opacity-80"
          />
          <img
            src={insta}
            alt=""
            className="w-8 cursor-pointer hover:translate-y-4 transition-all duration-300"
          />
          <img
            src={twitter}
            alt=""
            className="w-8 cursor-pointer hover:translate-y-4 transition-all duration-300"
          />
          <img
            src={linkedin}
            alt=""
            className="w-8 cursor-pointer hover:translate-y-4 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};
