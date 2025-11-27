import type { TESTIMONIALS } from "@/assets/data";

const TestimonialCard = ({ data }: { data: (typeof TESTIMONIALS)[0] }) => {
  return (
    <div className="relative w-80 h-96  hover:scale-105  backdrop-blur-lg text-black overflow-hidden shadow-lg cursor-pointer p-4 rounded-lg mx-4 min-h-[200px]  hover:shadow-lg transition-all duration-200 shrink-0">
      <div className="relative z-10  p-6 h-full w-full rounded-[10px] flex flex-col items-center justify-center text-center space-y-2 ">
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

        <p className="text-md text-gray-700 mb-4 px-4 overflow-hidden">
          {data.review}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
