import Doctor1 from "/doctor1.png";
import Doctor2 from "/doctor6.png";
import Doctor3 from "/doctor7.png";
import Doctor8 from "/doctor9.png";
import Doctor5 from "/doctor10.png";
import { useEffect, useState } from "react";

const HeroCarousel = () => {
  const doctor_images = [Doctor2, Doctor1, Doctor3, Doctor8, Doctor5];
  const [current, setCurrent] = useState<number>(0);
  const style_x = { transform: `translateX(-${current * 100}%)` };
  const slide_delay = 4500;

  const next_slide = () => {
    if (current < doctor_images.length - 1) {
      setCurrent(current + 1);
    } else {
      setCurrent(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next_slide();
    }, slide_delay);
    return () => clearInterval(interval);
  });

  return (
    <div
      className="flex justify-center max-xl:mt-8  w-full xl:max-w-md"
      onClick={next_slide}
    >
      <div className="flex  max-w-[480px] max-h-[720px] xl:max-h-[500px]  overflow-x-hidden">
        {doctor_images.map((image, index) => (
          <img
            key={index}
            className=" w-full rounded-2xl transition-transform ease-out duration-500"
            style={style_x}
            alt="doctor image"
            src={image}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
