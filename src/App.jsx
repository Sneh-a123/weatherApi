import React, { useState, useEffect } from "react";
import Image1 from "./assets/hotTemp.png";
import Image2 from "./assets/coldTemp.png";
import Image3 from "./assets/drop.png";
import Image4 from "./assets/cloud.png";
import Image5 from "./assets/wind.png";
import Logo from "./assets/logo.png";

function App() {
  const [temp, setTemp] = useState("");
  const [city, setCity] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [search, setSearch] = useState(localStorage.getItem("lastSearch") || "");
  const [tempMax, setTempMax] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [humidity, setHumidity] = useState("");
  const [clouds, setClouds] = useState("");
  const [wind, setWind] = useState("");
  const apiKey = "dbd0bb89dad3907d9fa77489f2935ff1";
  const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  async function getWeather() {
    if (!search) return;
    try {
      const response = await fetch(`${url}${search}&appid=${apiKey}`);
      const data = await response.json();
      if (data.cod === 200) {
        const currentTime = new Date(data.dt * 1000);
        setCity(data.name);
        setTemp(Math.round(data.main.temp));
        setTempMax(Math.round(data.main.temp_max));
        setTempMin(Math.round(data.main.temp_min));
        setHumidity(data.main.humidity);
        setClouds(data.clouds.all);
        setWind(data.wind.speed);
        setWeather(data.weather[0].description.toUpperCase());
        setTime(currentTime.toLocaleTimeString());
        setDay(currentTime.toLocaleDateString('en-US', { weekday: 'long' }));
        setDate(currentTime.toLocaleDateString());
        localStorage.setItem("lastSearch", search);
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  useEffect(() => {
    if (search) getWeather();
  }, []);

  return (
    <>
      <div className="w-full md:w-full lg:w-[60%]"><img className="relative m-7 w-[50%] md:w-30 lg:w-40" src={Logo} alt="Logo" /></div>
      <div className="w-full flex flex-col md:flex-col lg:flex-row justify-start items-center relative">
        <div className="mt-10 lg:mt-[10%] relative text-white flex justify-center items-center md:items-end space-x-0 md:space-x-4 w-full md:w-[60%]">
          <div className="text-[60px] md:text-[100px]">{temp}°</div>
          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-[50px] md:text-[70px]">{city}</h1>
            <span className="text-[14px] md:text-[17px]">{time} - {day}, {date}</span>
          </div>
          <div>
            <img src={Image4} alt="" />
          </div>
        </div>
        <div className="bg-white/15 w-full md:w-full lg:w-[40%] py-5 md:p-10 mt-8 md:mt-0 lg:mt-0 relative lg:bottom-[150px]">
          <div className="flex justify-center items-center">
            <input 
              className="border-b w-[80%] text-white border-white bg-transparent text-center md:text-left" 
              placeholder="Search Location" 
              type="text" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              onBlur={getWeather}
            />
            <i onClick={getWeather} className="fa-solid fa-magnifying-glass text-white relative right-5"></i>
          </div>
          <div className="flex flex-col justify-center mt-6 md:mt-12 text-white space-y-6 md:space-y-[30px]">
            <div className="text-[20px]">Weather Details...</div>
            <div className="text-[20px] md:text-[23px]">{weather}</div>
            <div>
              <ul className="flex-col mx-[20px] md:mx-0 lg:mx-0 justify-center items-center space-y-5 md:space-y-7 text-md md:text-2xl">
                <li className="flex justify-between items-center w-full">Temp max <span className="flex gap-5">{tempMax}°<img src={Image1} alt="" /></span></li>
                <li className="flex justify-between items-center w-full">Temp min <span className="flex gap-5">{tempMin}°<img src={Image2} alt="" /></span></li>
                <li className="flex justify-between items-center w-full">Humidity <span className="flex gap-5">{humidity}%<img src={Image3} alt="" /></span></li>
                <li className="flex justify-between items-center w-full">Clouds <span className="flex gap-5">{clouds}%<img src={Image4} alt="" /></span></li>
                <li className="flex justify-between items-center w-full">Wind <span className="flex gap-5">{wind} km/h<img src={Image5} alt="" /></span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
