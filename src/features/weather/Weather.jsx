import React from "react";

export default function Weather() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex-col gap-6 p-6">
      <div className="flex gap-4 w-full max-w-md bg-white shadow-2xl rounded-lg p-4">
        <input
          className="flex-1 bg-gray-100 h-10 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          type="text"
          placeholder="Enter city name..."
        />
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md transition-all hover:bg-indigo-600 active:scale-95">
          Search
        </button>
      </div>

      <div className="w-full max-w-md h-96 bg-white shadow-2xl rounded-lg overflow-auto p-4 flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-gray-700">Weather Info</p>
        <div className="flex flex-col items-center gap-2">
          <p className="text-4xl font-semibold text-gray-900">--°C</p>
          <p className="text-lg text-gray-600">Condition</p>
        </div>
      </div>
    </div>
  );
}
