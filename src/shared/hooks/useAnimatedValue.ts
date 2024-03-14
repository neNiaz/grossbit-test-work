import { useState, useEffect } from "react";

export const useAnimatedValue = (targetValue, duration = 20) => {
  const [value, setValue] = useState(targetValue ? parseFloat(targetValue) : 0);

  useEffect(() => {
    const startValue = value;
    const endValue = targetValue ? parseFloat(targetValue) : 0;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 2);

      setValue(startValue + (endValue - startValue) * progress);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [targetValue, duration, value]);

  return value.toFixed(4);
};
