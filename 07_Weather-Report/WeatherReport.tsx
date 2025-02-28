import { useState } from "react";
import "./WeatherReport.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


const WeatherReport = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric");
  const [loading, setLoading] = useState(false);


  const fetchWeather = async (query: string) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("Город не найден!");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError((err as Error).message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };


  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setError("Геолокация не поддерживается браузером");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        setLoading(true);
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${API_KEY}`
        );
        if (!response.ok) throw new Error("Ошибка получения данных по геолокации!");
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError((err as Error).message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="weather-container">
      <h2>Прогноз погоды</h2>


      <input
        type="text"
        placeholder="Введите город..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={() => fetchWeather(city)}>Поиск</button>
      <button onClick={fetchWeatherByLocation}>Мое местоположение</button>


      <div className="unit-toggle">
        <label className="cf">
          <input
            type="radio"
            name="unit"
            value="metric"
            checked={unit === "metric"}
            onChange={() => setUnit("metric")}
          />
          °C
        </label>
        <label className="cf">
          <input
            type="radio"
            name="unit"
            value="imperial"
            checked={unit === "imperial"}
            onChange={() => setUnit("imperial")}
          />
          °F
        </label>
      </div>


      {error && <p className="error">{error}</p>}
      {loading && <p>Загрузка...</p>}

      {weather && (
        <div className="weather-info">
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p>Температура: {weather.main.temp}°{unit === "metric" ? "C" : "F"}</p>
          <p>Влажность: {weather.main.humidity}%</p>
          <p>Описание: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherReport;
