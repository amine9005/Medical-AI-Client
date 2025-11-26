import type { TESTIMONIALS } from "@/assets/data";
// import { useRef, useState, type MouseEvent } from "react";

const TestimonialCard = ({ data }: { data: (typeof TESTIMONIALS)[0] }) => {
  // const [visible, setVisible] = useState(false);
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  // const divRef = useRef<HTMLDivElement>(null);

  // const handleMouseMove = (e: MouseEvent) => {
  //   const bounds = divRef.current!.getBoundingClientRect();
  //   setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  // };

  return (
    <div
      // ref={divRef}
      // onMouseMove={handleMouseMove}
      // onMouseEnter={() => setVisible(true)}
      // onMouseLeave={() => setVisible(false)}
      className="relative w-80 h-96 rounded-xl hover:scale-105 hover:shadow-2xl p-0.5 backdrop-blur-lg text-black overflow-hidden shadow-lg cursor-pointer"
    >
      {/* {visible && (
        <div
        // className="pointer-events-none blur-xl border border-blue-600 size-60 absolute z-0 transition-opacity duration-300"
        // style={{ top: position.y - 120, left: position.x - 120 }}
        />
      )} */}

      <div className="relative z-10  p-6 h-full w-full rounded-[10px] flex flex-col items-center justify-center text-center space-y-2">
        <img
          src={data.img}
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full shadow-md my-4"
        />
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{data.name}</h2>
        <div key={data.id} className="rating ">
          {Array(data.rating)
            .fill(0)
            .map((_, index) => (
              <input
                type="radio"
                disabled
                defaultChecked
                className="mask mask-star-2 bg-orange-400 hover:cursor-default"
                aria-label={`${index + 1} star`}
                key={index}
              />
            ))}
        </div>

        <p className="text-md text-gray-700 mb-4 px-4">{data.review}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
