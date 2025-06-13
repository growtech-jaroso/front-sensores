import {useEffect, useState} from "react";

interface WaterProgressBarProps {
  isIrrigating: boolean;
  duration?: number; // Duración del riego en segundos
}

const WaterProgressBar = ({ isIrrigating, duration = 3, }: WaterProgressBarProps ) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isIrrigating) {
      setProgress(0);
      return;
    }

    const interval = 100; // ms
    const totalSteps = (duration * 1000) / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / totalSteps) * 100);
      if (currentStep >= totalSteps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [isIrrigating, duration]);

  return (
    <div className="w-full h-6 bg-blue-100 rounded-full overflow-hidden relative shadow-inner">
      {/* Capa de progreso */}
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-[width] duration-200 ease-in-out relative"
        style={{width: `${progress}%`}}
      >
        {/* Simulación de agua en movimiento */}
        <div className="absolute top-0 left-0 w-full h-full bg-blue-200 opacity-40 animate-wave"/>
      </div>
    </div>

  );
};

export default WaterProgressBar;
