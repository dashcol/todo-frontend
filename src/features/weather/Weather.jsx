// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { WeatherAsyncThunk } from "../../redux/redux.reducers.weather";

// export default function Weather() {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState("");
//   const [condition, setCondition] = useState({ text: "", icon: "" });
//   const dispatch = useDispatch();

//   const handleSearch = async () => {
//     setCity("");
//     setCondition({ text: "", icon: "" });
//     const weather = await dispatch(WeatherAsyncThunk(city));

//     if (weather.payload && weather.payload.current) {
//       setCondition({
//         text: weather.payload.current.condition.text,
//         icon: `https:${weather.payload.current.condition.icon}`,
//       });
//       setWeather(weather.payload.current.temp_c);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex-col gap-6 p-6">
//       <div className="flex gap-4 w-full max-w-md bg-white shadow-2xl rounded-lg p-4">
//         <input
//           className="flex-1 bg-gray-100 h-10 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
//           type="text"
//           placeholder="Enter city name..."
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md transition-all hover:bg-indigo-600 active:scale-95"
//         >
//           Search
//         </button>
//       </div>

//       <div className="w-full max-w-md h-96 bg-white shadow-2xl rounded-lg overflow-auto p-4 flex flex-col items-center justify-center gap-4">
//         <p className="text-xl text-gray-700">Weather Info</p>
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-4xl font-semibold text-gray-900">
//             {weather ? weather : "--"}°C
//           </p>
//           <p className="text-lg text-gray-600">Condition</p>
//           <p className="text-lg text-gray-600">{condition.text}</p>
//           {condition.icon && (
//             <img
//               alt="weather"
//               src={condition.icon}
//               className="w-20 h-20 object-contain"
//               onError={(e) => (e.target.style.display = "none")}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { WeatherAsyncThunk } from "../../redux/redux.reducers.weather";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [condition, setCondition] = useState({ text: "", icon: "" });
  const dispatch = useDispatch();

  const handleSearch = async () => {
    setCondition({ text: "", icon: "" });
    const result = await dispatch(WeatherAsyncThunk(city));
    if (result.payload && result.payload.current) {
      setWeather(result.payload.current.temp_c);
      setCondition({
        text: result.payload.current.condition.text,
        icon: `https:${result.payload.current.condition.icon}`,
      });
    }
    setCity("");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center flex-col gap-6 p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-2xl">
          <CardContent className="p-4 flex gap-4 items-center">
            <Input
              className="bg-white/10 border-white/30 text-white placeholder:text-white"
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90"
            >
              Search
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md"
      >
        <Card className="h-96 overflow-auto backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-2xl flex flex-col items-center justify-center p-4 gap-4">
          <h2 className="text-xl font-semibold">Weather Info</h2>
          <p className="text-4xl font-bold">
            {weather ? `${weather}°C` : "--°C"}
          </p>
          <p className="text-lg">{condition.text || "No condition"}</p>
          {condition.icon && (
            <img
              alt="weather"
              src={condition.icon}
              className="w-20 h-20 object-contain"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
        </Card>
      </motion.div>
    </div>
  );
}
