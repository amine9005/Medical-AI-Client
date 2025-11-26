// import type { APP_FEATURES } from "@/assets/data";
// import React from "react";

// const FeatureCard = ({ feature }: { feature: (typeof APP_FEATURES)[0] }) => {
//   const [visible, setVisible] = React.useState(false);
//   const [position, setPosition] = React.useState({ x: 0, y: 0 });
//   const divRef = React.useRef(null);

//   const handleMouseMove = (e) => {
//     const bounds = divRef.current.getBoundingClientRect();
//     setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
//   };
//   return (
//     <div
//       ref={divRef}
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setVisible(true)}
//       onMouseLeave={() => setVisible(false)}
//       className="relative w-80 h-96 rounded-xl p-px bg-gray-900 backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer"
//     >
//       <div
//         className={`pointer-events-none blur-3xl rounded-full bg-linear-to-r from-blue-500 via-indigo-500 to-purple-300 size-60 absolute z-0 transition-opacity duration-500 ${
//           visible ? "opacity-100" : "opacity-0"
//         }`}
//         style={{ top: position.y - 120, left: position.x - 120 }}
//       />

//       <div
//         className={`flex flex-col text-center items-center justify-center rounded-xl p-6 border-2 ${feature.border_color} gap-6 max-w-sm`}
//       >
//         <div className={`p-6 aspect-square rounded-full ${feature.icon_color}`}>
//           <feature.icon className="text-white size-8" />
//         </div>
//         <div className="space-y-2">
//           <h2 className="text-base font-semibold text-slate-700">
//             {feature.title}
//           </h2>
//           <p className="text-sm text-slate-600">{feature.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeatureCard;
