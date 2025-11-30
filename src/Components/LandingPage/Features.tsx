import type { Variants } from "motion";
import FeatureCard from "./FeatureCard";
import { APP_FEATURES } from "@/assets/data";
import { motion } from "motion/react";

const Features = () => {
  const container_variant: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.4,
      },
    },
  };

  const popup_variant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10,
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  };

  const card_variant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="container min-h-screen">
      <motion.div
        variants={popup_variant}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.8 }}
        className="text-center"
      >
        <h2 className="text-slate-700 text-[42px] text-semiBold">
          Powerful AI Tools
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Everything you need to get an quick and accurate health advice form
          the our best AI models.{" "}
        </p>
      </motion.div>
      <motion.div
        variants={container_variant}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        className="flex items-center justify-center flex-wrap gap-8 mt-20 px-4 md:px-0"
      >
        {APP_FEATURES.map((feature) => (
          <motion.div key={feature.id} variants={card_variant}>
            <FeatureCard key={feature.id} feature={feature} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
