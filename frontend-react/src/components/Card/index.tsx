import mixmatch from "../../assests/images/mixmatch.jpeg";
import size from "../../assests/images/size.jpeg";
import tryon from "../../assests/images/tryon.jpeg";
import { Variants, motion } from "framer-motion";

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
      delay?: number; // Make delay optional
      ease: number[];
    };
  };
}
export const Card = () => {
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

  return (
    <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto" id="card">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-24">
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="lg:w-1/4"
        >
          <h3 className="text-2xl text-deepblue font-bold lg:w-1/2 mb-3">
            Why we are better than others
          </h3>
          <p className="text-base text-darker">
            Stylize Sets the Standard: Unmatched Virtual Try-On, Limitless Mix
            and Match Studio, Precision Size Measurements, and Personalized Recommendations – Redefining
            Fashion Technology Excellence.
          </p>
        </motion.div>
        {/* featured cards */}
        <div
          // variants={fadeIn("right", 0.3)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.7 }}
          className="w-full lg:w-3/4"
        >
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-6">
            <div
              className="bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 md:h-[400px] shadow-3xl p-4 sm:p-8
              items-center flex justify-center items-center hover:-translate-y-4 transition-all duration-300
              cursor-pointer"
            >
              <div>
                <img
                  src={tryon}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <h5 className="text-2xl font-semibold text-darker px-3 sm:px-5 text-center mt-5">
                  Virtual Try-On
                </h5>
              </div>
            </div>
            <div
              className="bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 md:h-[400px] shadow-3xl p-4 sm:p-8
              items-center flex justify-center items-center hover:-translate-y-4 transition-all duration-300
              cursor-pointer md:mt-16"
            >
              <div>
                <img src={size} alt="" className="w-full h-full object-cover" />
                <h5 className="text-2xl font-semibold text-darker px-3 sm:px-5 text-center mt-5">
                  Size Measurements
                </h5>
              </div>
            </div>
            <div
              className="bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 md:h-[400px] shadow-3xl p-4 sm:p-8
              items-center flex justify-center items-center hover:-translate-y-4 transition-all duration-300
              cursor-pointer"
            >
              <div>
                <img
                  src={mixmatch}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <h5 className="text-2xl font-semibold text-darker px-3 sm:px-5 text-center mt-5">
                  Mix and Match Studio
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;