import { useState, useEffect } from 'react';

const useTimeContext = () => {
  const [timeContext, setTimeContext] = useState({
    hour: 0,
    dayOfWeek: 0,
    isWeekend: false,
    isMorning: false,
    isAfternoon: false,
    isEvening: false,
    isNight: false,
    season: 'spring'
  });

  useEffect(() => {
    const updateTimeContext = () => {
      const now = new Date();
      const hour = now.getHours();
      const dayOfWeek = now.getDay();
      const month = now.getMonth();

      // Determine time of day
      const isMorning = hour >= 6 && hour < 12;
      const isAfternoon = hour >= 12 && hour < 17;
      const isEvening = hour >= 17 && hour < 22;
      const isNight = hour >= 22 || hour < 6;

      // Determine if weekend
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      // Determine season
      let season = 'spring';
      if (month >= 2 && month <= 4) season = 'spring';
      else if (month >= 5 && month <= 7) season = 'summer';
      else if (month >= 8 && month <= 10) season = 'autumn';
      else season = 'winter';

      setTimeContext({
        hour,
        dayOfWeek,
        isWeekend,
        isMorning,
        isAfternoon,
        isEvening,
        isNight,
        season
      });
    };

    updateTimeContext();
    const interval = setInterval(updateTimeContext, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return timeContext;
};

export default useTimeContext; 