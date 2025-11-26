import type { APP_FEATURES } from "@/assets/data";
import { useRef, useState, type MouseEvent } from "react";

const FeatureCard = ({ feature }: { feature: (typeof APP_FEATURES)[0] }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const bounds = divRef.current!.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };
  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="relative  rounded-xl p-px backdrop-blur-lg text-white overflow-hidden shadow-2xl cursor-pointer"
    >
      <div
        className={`pointer-events-none blur-3xl rounded-full bg-linear-to-r ${
          feature.bg_from
        } ${feature.bg_via} ${
          feature.bg_to
        } size-60 absolute z-0 transition-opacity duration-500 ${
          visible ? "opacity-40" : "opacity-0"
        }`}
        style={{ top: position.y - 120, left: position.x - 120 }}
      />

      <div
        className={`flex flex-col min-h-[250px] text-center items-center justify-center rounded-xl p-6 border-2 ${feature.border_color} gap-6 max-w-sm`}
      >
        <div className={`p-6 aspect-square rounded-full ${feature.icon_color}`}>
          <feature.icon className="text-white size-8" />
        </div>
        <div className="space-y-2">
          <h2 className=" text-xl font-semibold text-slate-900">
            {feature.title}
          </h2>
          <p className="text-md text-slate-700">{feature.description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
