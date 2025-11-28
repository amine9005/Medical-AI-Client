import { TESTIMONIALS } from "@/assets/data";
import TestimonialCard from "./TestimonialCard";
import { motion } from "motion/react";

const Testimonials = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8  min-h-screen overflow-x-hidden">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Testimonials</h2>
      {/* Upper Marquee */}
      <div className="flex">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 40,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className="flex shrink-0"
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
            <TestimonialCard key={index} data={testimonial} />
          ))}
        </motion.div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 40,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className="flex shrink-0"
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
            <TestimonialCard key={index} data={testimonial} />
          ))}
        </motion.div>
      </div>
      {/* Lower Marquee */}
      <div className="flex mt-12">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "50%" }}
          transition={{
            duration: 40,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className="flex shrink-0"
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
            <TestimonialCard key={index} data={testimonial} />
          ))}
        </motion.div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "50%" }}
          transition={{
            duration: 40,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className="flex shrink-0"
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
            <TestimonialCard key={index} data={testimonial} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
