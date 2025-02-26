import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { WeatherAsyncThunk } from "../../redux/redux.reducers.weather";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [condition, setCondition] = useState({ text: "", icon: "" });
  const dispatch = useDispatch();

  const handleSearch = async () => {
    setCity("");
    setCondition({ text: "", icon: "" });
    const weather = await dispatch(WeatherAsyncThunk(city));

    if (weather.payload && weather.payload.current) {
      setCondition({
        text: weather.payload.current.condition.text,
        icon: `https:${weather.payload.current.condition.icon}`,
      });
      setWeather(weather.payload.current.temp_c);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex-col gap-6 p-6">
      <div className="flex gap-4 w-full max-w-md bg-white shadow-2xl rounded-lg p-4">
        <input
          className="flex-1 bg-gray-100 h-10 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md transition-all hover:bg-indigo-600 active:scale-95"
        >
          Search
        </button>
      </div>

      <div className="w-full max-w-md h-96 bg-white shadow-2xl rounded-lg overflow-auto p-4 flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-gray-700">Weather Info</p>
        <div className="flex flex-col items-center gap-2">
          <p className="text-4xl font-semibold text-gray-900">
            {weather ? weather : "--"}°C
          </p>
          <p className="text-lg text-gray-600">Condition</p>
          <p className="text-lg text-gray-600">{condition.text}</p>
          {condition.icon && (
            <img
              alt="weather"
              src={condition.icon}
              className="w-20 h-20 object-contain"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
