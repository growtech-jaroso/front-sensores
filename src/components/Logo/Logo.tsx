import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="text-center">
      <div className="w-24 h-24 bg-green-600 text-white flex items-center justify-center text-5xl rounded-full shadow-lg mx-auto mb-4">
        🌱
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700 drop-shadow-md">
        GrowTech Jaroso
      </h1>
    </div>
  );
};

export default Logo;
