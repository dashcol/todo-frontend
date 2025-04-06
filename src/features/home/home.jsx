// export default function Home() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//       <div className="flex gap-8   ">
//         <a href="/todos">
//           <div className="text-center bg-blue-500 text-white px-16 py-14 rounded-lg shadow-md hover:bg-blue-600 transition-all cursor-pointer">
//             <h1 className="text-xl font-bold">Todo</h1>
//           </div>
//         </a>

//         <a href="/notes">
//           <div className="text-center bg-yellow-500 text-white px-16 py-14 rounded-lg shadow-md hover:bg-yellow-600 transition-all cursor-pointer">
//             <h1 className="text-xl font-bold">Notes</h1>
//           </div>
//         </a>

//         <a href="/weather">
//           <div className="text-center bg-green-500 text-white px-16 py-14 rounded-lg shadow-md hover:bg-green-600 transition-all cursor-pointer">
//             <h1 className="text-xl font-bold">Weather</h1>
//           </div>
//         </a>
//       </div>
//     </div>
//   );
// }

import FeatureCard from "./FeatureCard";
export default function Home() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1950&q=80')", // replace this with your preferred image
      }}
    >
      <div className="flex gap-10 flex-wrap justify-center">
        <FeatureCard title="Todo" color="blue" link="/todos" />
        <FeatureCard title="Notes" color="yellow" link="/notes" />
        <FeatureCard title="Weather" color="green" link="/weather" />
      </div>
    </div>
  );
}
