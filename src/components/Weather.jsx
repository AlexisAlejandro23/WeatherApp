import React, { useEffect, useState, useRef } from "react";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import drizzle from "../assets/drizzle.png";
import snow from "../assets/snow.png";
import rain from "../assets/rain.png";

function Weather() {

    const inputRef = useRef(null);

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        '01d': clear,
        '01n': clear,
        '02d': cloud,
        '02n': cloud,
        '03d': cloud,
        '03n': cloud,
        '04d': cloud,
        '04n': cloud,
        '09d': drizzle,
        '09n': drizzle,
        '10d': rain,
        '10n': rain,
        '11d': snow,
        '11n': snow,
        '13d': snow,
        '13n': snow,
        '50d': snow,
        '50n': snow,
    }

    const search = async(city) => {
        if(city == ''){
            alert('Please enter a city name')
            return;
        }
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
        const response = await fetch(url)
        const data = await response.json()

        if(!response.ok){
            alert(data.message)
            return;
        }

        const icon = allIcons[data.weather[0].icon] || clear;
        setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location: data.name,
            icon: icon
        })
        console.log(data)
    } catch (error) {
        setWeatherData(false)
        console.error("Error fetching weather data:", error)
    }    
    }

    React.useEffect(() => {
        search('Paris');
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-purple-800">
        <div id="weather-container" className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 rounded-3xl shadow-lg w-128">
                <div className="flex items-center space-x-6">
                    <input ref={inputRef} type="text" className="bg-transparent border border-white/20 rounded-md p-3 text-white w-full placeholder-white focus:outline-none focus:border-white/50" placeholder="Enter city name" onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            search(inputRef.current.value);
                        }
                    }} />
                    <button id="search-btn" className="bg-white/10 text-white px-6 py-3 rounded-md hover:bg-white/20 transition-all duration-300 cursor-pointer" onClick={() => search(inputRef.current.value)}>Search</button>
                </div>

                {weatherData ? <>
                <div className="space-y-6 text-white flex flex-col items-center pt-8" >
                     <img src={weatherData?.icon || clear} alt="weather" className="w-48 h-48" />
                    <p id="temp" className="text-6xl font-bold">{weatherData.temperature}°C</p>
                    <p id="city" className="text-3xl font-semibold">{weatherData.location}</p>
                </div>


                <div id="weather-info" className="flex items-center justify-center space-x-6 mt-12">
                    <div className="flex flex-col items-center space-y-3">
                         <img src={humidity} alt="humidity" className="w-16 h-16" />
                        <p className="text-white text-center text-lg">Humidity</p>
                        <p className="text-white text-center text-lg">{weatherData.humidity}%</p>
                    </div>

                    <div id="wind-info" className="flex flex-col items-center space-y-3">
                         <img src={wind} alt="wind" className="w-16 h-16" />
                        <p className="text-white text-center text-lg">Wind</p>
                        <p className="text-white text-center text-lg">{weatherData.windSpeed} km/h</p>
                    </div>
                </div>
                </>:<></>}

            </div>
        </div>
    );
};

export default Weather;