import { HeartPlusIcon } from "lucide-react";
import { motion, type Variants } from "motion/react";
import HeroCarousel from "./HeroCarousel";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  // Animations Section
  const popup_variant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.5,
        delay: 4,
      },
    },
  };

  const image_variant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 1,
        delay: 5,
      },
    },
  };

  const fade_in_variant: Variants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        ease: "easeInOut",
        duration: 1.5,
      },
    },
  };

  const container_variant: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 1.2,
      },
    },
  };

  const text_delay_variant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.5,
        delay: 3.6,
      },
    },
  };
  // Animations Section End

  const to_dashboard = () => {
    navigate("/dashboard");
  };
  return (
    <motion.section
      viewport={{ amount: 0.1 }}
      className="min-h-screen flex flex-wrap justify-between  items-center px-4 md:px-16 xl:px-24 2xl:px-32"
    >
      <div className="flex flex-col max-xl:mt-10 max-xl:mx-auto items-center xl:items-start xl:justify-start">
        <motion.div
          variants={container_variant}
          initial={"hidden"}
          whileInView={"visible"}
          viewport={{ amount: 0.2 }}
          className="text-center xl:text-left text-4xl leading-[50px] md:text-6xl md:leading-[84px] font-medium max-w-xl text-slate-900"
        >
          <motion.h4
            variants={fade_in_variant}
            className="bg-linear-to-r text-transparent bg-clip-text from-blue-700  to-blue-400 overflow-hidden text-nowrap"
          >
            Medical AI Agents{" "}
          </motion.h4>{" "}
          <motion.p
            variants={fade_in_variant}
            className="overflow-x-hidden text-nowrap"
          >
            to Help With Your
          </motion.p>
          <motion.p
            variants={fade_in_variant}
            className="overflow-x-hidden text-nowrap"
          >
            Medical Needs.
          </motion.p>
        </motion.div>
        <motion.p
          variants={text_delay_variant}
          initial={"hidden"}
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className="text-center xl:text-left text-sm text-slate-700 max-w-xs md:max-w-lg mt-2"
        >
          We provide you with AI medical consolations via voice chat, create a
          consolations and start talking with the best AI medical agents
        </motion.p>
        <div className="flex items-center gap-4 mt-8 text-sm">
          <motion.button
            onClick={() => to_dashboard()}
            variants={popup_variant as Variants}
            initial={"hidden"}
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            className="btn btn-primary md:btn-lg px-12 md:px-24 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 hover:bg-linear-to-r hover:from-indigo-500 hover:to-indigo-400 bg-linear-to-r from-indigo-600 to-indigo-400 gap-4"
          >
            <HeartPlusIcon className="size-8 text-white" />
            Get Started
          </motion.button>
        </div>
      </div>
      <motion.div
        variants={image_variant}
        initial={"hidden"}
        whileInView="visible"
        viewport={{ amount: 0.2 }}
      >
        <HeroCarousel />
      </motion.div>
      {/* <img
        src={Doctor1}
        alt="doctor image"
        className=" w-full rounded-2xl max-xl:mt-8 xl:max-w-md transition-all duration-300"
      /> */}
    </motion.section>
  );
};

export default Hero;
