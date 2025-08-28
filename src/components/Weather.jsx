import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "./../assets/search.png";
import clear_icon from "./../assets/clear.png";
import cloud_icon from "./../assets/cloud.png";
import drizzle_icon from "./../assets/drizzle.png";
import rain_icon from "./../assets/rain.png";
import snow_icon from "./../assets/snow.png";
import wind_icon from "./../assets/wind.png";
import humidity_icon from "./../assets/humidity.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [value, setValue] = useState("");
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "010d": rain_icon,
    "010n": rain_icon,
    "013d": snow_icon,
    "013n": snow_icon,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log("error with fetching weather data");
    }
  };

  return (
    <div className="weather">
      <form
        className="search-bar"
        onSubmit={(e) => {
          e.preventDefault();
          if (value !== "") {
            search(value);
            setValue("");
          } else {
            alert("Enter City Name");
            return;
          }
        }}
      >
        <input
          type="text"
          placeholder="search"
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">
          <img src={search_icon} alt="search" />
        </button>
      </form>
      {weatherData ? (
        <>
          <img
            src={weatherData.icon}
            alt="weather-icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed}kmh</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
