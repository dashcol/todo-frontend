export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex gap-8   ">
        <a href="/todos">
          <div className="text-center bg-blue-500 text-white px-16 py-14 rounded-lg shadow-md hover:bg-blue-600 transition-all cursor-pointer">
            <h1 className="text-xl font-bold">Todo</h1>
          </div>
        </a>

        <a href="/notes">
          <div className="text-center bg-yellow-500 text-white px-16 py-14 rounded-lg shadow-md hover:bg-yellow-600 transition-all cursor-pointer">
            <h1 className="text-xl font-bold">Notes</h1>
          </div>
        </a>

        <a href="/weather">
          <div className="text-center bg-green-500 text-white px-16 py-14 rounded-lg shadow-md hover:bg-green-600 transition-all cursor-pointer">
            <h1 className="text-xl font-bold">Weather</h1>
          </div>
        </a>
      </div>
    </div>
  );
}
