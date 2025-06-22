import { useState, useEffect } from 'react';

const useWeatherContext = () => {
  const [weatherContext, setWeatherContext] = useState({
    weather: 'sunny',
    temperature: 20,
    isRaining: false,
    isSnowing: false,
    isCloudy: false
  });

  useEffect(() => {
    // For demo purposes, we'll simulate weather data
    // In a real app, this would fetch from a weather API
    const simulateWeather = () => {
      const weatherTypes = ['sunny', 'cloudy', 'rainy', 'snowy'];
      const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
      const temperature = Math.floor(Math.random() * 30) + 5; // 5-35°C
      
      setWeatherContext({
        weather: randomWeather,
        temperature,
        isRaining: randomWeather === 'rainy',
        isSnowing: randomWeather === 'snowy',
        isCloudy: randomWeather === 'cloudy'
      });
    };

    simulateWeather();
    const interval = setInterval(simulateWeather, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return weatherContext;
};

export default useWeatherContext; 