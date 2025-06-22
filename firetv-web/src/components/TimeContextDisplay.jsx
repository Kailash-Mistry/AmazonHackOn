import React from 'react';
import useTimeContext from '../context/useTimeContext';
import useWeatherContext from '../context/useWeatherContext';

const TimeContextDisplay = () => {
  const timeCtx = useTimeContext();
  const weatherCtx = useWeatherContext();

  const getDayName = (dayOfWeek) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek];
  };

  const getTimeOfDay = () => {
    if (timeCtx.isMorning) return 'Morning';
    if (timeCtx.isAfternoon) return 'Afternoon';
    if (timeCtx.isEvening) return 'Evening';
    if (timeCtx.isNight) return 'Night';
    return 'Unknown';
  };

  const formatHour = (hour) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-white mb-3">Current Context</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Time</div>
          <div className="text-white font-medium">{formatHour(timeCtx.hour)}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Day</div>
          <div className="text-white font-medium">{getDayName(timeCtx.dayOfWeek)}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Period</div>
          <div className="text-white font-medium">{getTimeOfDay()}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Weather</div>
          <div className="text-white font-medium capitalize">{weatherCtx.weather}</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-400">
        Context-aware playlists are generated based on your current time, day, and weather conditions.
      </div>
    </div>
  );
};

export default TimeContextDisplay; 