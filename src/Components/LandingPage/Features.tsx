import FeatureCard from "./FeatureCard";
import { APP_FEATURES } from "@/assets/data";

const Features = () => {
  return (
    <div className="container min-h-screen">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] text-semiBold">
          Powerful AI Tools
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Everything you need to get an quick and accurate health advice form
          the our best AI models.{" "}
        </p>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-8 mt-20 px-4 md:px-0">
        {APP_FEATURES.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </div>
  );
};

export default Features;
