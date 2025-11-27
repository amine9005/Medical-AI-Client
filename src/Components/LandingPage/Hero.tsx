import { HeartPlusIcon } from "lucide-react";
import { motion, type Variants } from "motion/react";

const Hero = () => {
  const popup_variant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  };

  const FadeIn_variant = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        ease: "easeInOut",
        duration: 1.5,
      },
    },
  };

  const FadeIn_variant_2: Variants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        ease: "easeInOut",
        duration: 1.5,
        delay: 1.4,
      },
    },
  };

  const FadeIn_variant_3: Variants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        ease: "easeInOut",
        duration: 1.5,
        delay: 2.9,
      },
    },
  };

  return (
    <section className="min-h-screen flex flex-wrap justify-between  items-center px-4 md:px-16 xl:px-24 2xl:px-32">
      <div className="flex flex-col max-xl:mt-10 max-xl:mx-auto items-center xl:items-start xl:justify-start">
        <div className="text-center xl:text-left text-4xl leading-[50px] md:text-6xl md:leading-[84px] font-medium max-w-xl text-slate-900">
          <motion.h4
            variants={FadeIn_variant as Variants}
            initial={"hidden"}
            whileInView={"visible"}
            viewport={{ amount: 0.8 }}
            className="bg-linear-to-r text-transparent bg-clip-text from-blue-700  to-blue-400 overflow-hidden text-nowrap"
          >
            Medical AI Agents{" "}
          </motion.h4>{" "}
          <motion.p
            variants={FadeIn_variant_2 as Variants}
            initial={"hidden"}
            whileInView={"visible"}
            viewport={{ amount: 0.8 }}
            className="overflow-x-hidden text-nowrap"
          >
            to Help With Your
          </motion.p>
          <motion.p
            variants={FadeIn_variant_3 as Variants}
            initial={"hidden"}
            whileInView={"visible"}
            viewport={{ amount: 0.8 }}
            className="overflow-x-hidden text-nowrap"
          >
            Medical Needs.
          </motion.p>
        </div>
        <p className="text-center xl:text-left text-sm text-slate-700 max-w-xs md:max-w-lg mt-2">
          We provide you with AI medical consolations via voice chat, create a
          consolations and start talking with the best AI medical agents
        </p>
        <div className="flex items-center gap-4 mt-8 text-sm">
          <motion.button
            variants={popup_variant as Variants}
            initial={"hidden"}
            whileInView="visible"
            viewport={{ amount: 0.8 }}
            className="btn btn-primary md:btn-lg px-12 md:px-24 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 hover:bg-linear-to-r hover:from-indigo-500 hover:to-indigo-400 bg-linear-to-r from-indigo-600 to-indigo-400 gap-4"
          >
            <HeartPlusIcon className="size-8 text-white" />
            Get started
          </motion.button>
        </div>
      </div>
      <img
        src="/doctor1.png"
        alt="hero"
        className=" w-full rounded-2xl max-xl:mt-8 xl:max-w-md transition-all duration-300"
      />
    </section>
  );
};

export default Hero;
