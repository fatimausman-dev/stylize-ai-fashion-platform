import { Variants, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button, Navbar, Card, Footer } from "../../components";
import pic4 from "../../assests/images/pic4.jpeg";
import formimg from "../../assests/images/formimg.jpg";
import retailer from "../../assests/images/retailer.jpg";

interface FadeAnimation extends Variants {
  hidden: {
    y: number;
    opacity: number;
    x: number;
  };
  show: {
    y: number;
    x: number;
    opacity: number;
    transition: {
      type: string;
      duration: number;
      delay?: number;
      ease: number[];
    };
  };
}

const navItems = [
  { link: "Home", path: "home" },
  { link: "About", path: "about" },
  { link: "Features", path: "card" },
  { link: "Vendor", path: "vendor" },
  { link: "Contact Us", path: "contact us" },
];

const navItemsRight = [
  { link: "Sign up", path: "/sign-up" },
  { link: "Sign in", path: "/sign-in" },
];

const carouselItems = [
  { image: pic4, alt: "image1" },
  { image: "https://picsum.photos/200/300", alt: "image2" },
  { image: "https://picsum.photos/200/300", alt: "image3" },
];

export const Home = () => {
  const fadeIn = (direction: string, delay: number): FadeAnimation => {
    return {
      hidden: {
        y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
        opacity: 0,
        x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      },
      show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          type: "tween",
          duration: 1.2,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
    };
  };

  const navigate = useNavigate();
  const handleStartSelling = () => {
    navigate("/sign-up");
  };
  return (
    <div className="bg-light">
      <Navbar navItems={navItems} navItemsRight={navItemsRight} />
      <div
        className="md:px-12 p-4 max-w-screen-2xl mx-auto mt-24 relative"
        id="home"
      >
        <div className="gradientBg rounded-xl relative overflow-hidden rounded-br-[80px] md:p-9 px-4 py-9">
          <div className="absolute inset-0 opacity-50"></div>
          <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-10">
            {/* Banner Image */}
            <motion.div
              variants={fadeIn("down", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              <img src={pic4} alt="" className="lg:h-[386px] object-cover" />
            </motion.div>
            {/* Banner Content */}
            <motion.div
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="md:w-3/5 text-deepblue z-10"
            >
              <h2 className="md:text-7xl text-4xl font-bold text-deepblue mb-1 leading-relaxed">
                Welcome to
              </h2>
              <p className="md:text-7xl text-4xl font-bold text-purple mb-6 leading-relaxed">
                Stylize!
              </p>
              <p className="text-darker text-2xl mb-4">
                Revolutionize Retail with Stylize: Where Fashion Meets
                Innovation
              </p>
              <div className="space-x-5 space-y-4">
                <Button
                  style="w-24 justify-center shadow-none border border-purple"
                  onClick={handleStartSelling}
                >
                  Start Selling
                </Button>
                <Button style="w-24 justify-center shadow-none border border-purple bg-white text-purple">
                  Shop Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div
        className="md:px-12 p-4 max-w-screen-2xl mx-auto mt-24 relative"
        id="about"
      >
        <div className="gradientBg rounded-xl relative overflow-hidden rounded-br-[80px] md:p-9 px-4 py-9">
          <div className="absolute inset-0 opacity-50"></div>
          <div className="flex flex-col-reverse md:flex-row-reverse justify-between items-center gap-10">
            {/* Banner Content */}
            <motion.div
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="md:w-3/5 text-deepblue z-10"
            >
              <p className="md:text-3xl font-bold text-deepblue mb-6 leading-relaxed">
                Empowering individuals through impactful advancements
              </p>
              <p className="text-darker text-md font-medium mb-4 text-justify">
                Stylize is a social commerce platform dedicated to introducing
                cutting-edge innovations to commercial communities. Our mission
                is to revolutionize the conventional commerce landscape,
                offering a more reliable, smart, decentralized, and engaging
                experience through the utilization of sophisticated technologies
                like artificial intelligence (AI) and augmented reality (AR) in
                the fashion world.
              </p>
              <p className="text-darker text-md  font-medium mb-4 text-justify">
                By catering to the needs of both consumers and retailers,
                Stylize promises a comprehensive personalized shopping
                experience for shoppers and improved business operations for
                retailers, ultimately transforming the way fashion is bought and
                sold in the digital age.
              </p>
            </motion.div>
            {/* Banner Image */}
            <motion.div
              variants={fadeIn("down", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              <img src={formimg} alt="" className="lg:h-[386px] object-cover" />
            </motion.div>
          </div>
        </div>
      </div>
      <Card />
      {/* <SelfMovingCarousel items={carouselItems}/> */}
      <div className="md:px-14 p-4 max-w-s mx-auto -mt-40" id="vendor">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 ">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="md:w-1/2"
          >
            <img src={retailer} alt="" className="w-90 h-90" />
          </motion.div>

          {/* Retailer content */}
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="md:w-2/5"
          >
            <h2 className="md:text-5xl text-3xl font-bold text-deepblue mb-5 leading-normal">
              Empower Your Business with{" "}
              <span className="text-purple">Stylize</span>
            </h2>
            <p className="text-darker text-lg mb-7">
              Effortless Inventory Management, Actionable Reports, Strategic
              Insights, and Real-time Stock Alerts
            </p>
            <Link to="/sign-up" className="underline">
              <Button>Start Selling</Button>{" "}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
