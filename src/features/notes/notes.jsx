// import React, { useEffect, useState } from "react";
// import NotesBox from "../notesBox/NotesBox";
// import { useDispatch } from "react-redux";
// import {
//   getAsyncThunk,
//   postAsyncThunk,
// } from "../../redux/redux.reducers.notes";

// function Notes() {
//   const [notes, setNotes] = useState("");
//   const dispatch = useDispatch();

//   const handleAdd = () => {
//     if (!notes.trim()) return;
//     dispatch(postAsyncThunk({ notes }));
//     setNotes("");
//   };

//   useEffect(() => {
//     dispatch(getAsyncThunk());
//   }, [dispatch]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex-col gap-6 p-6">
//       <div className="flex gap-4 w-full max-w-md bg-white shadow-2xl rounded-lg p-4 flex-col">
//         <textarea
//           className="flex-1 bg-gray-100 h-24 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all resize-none"
//           value={notes}
//           placeholder="Enter your note..."
//           onChange={(e) => setNotes(e.target.value)}
//         ></textarea>
//         <button
//           className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md transition-all hover:bg-indigo-600 active:scale-95"
//           onClick={handleAdd}
//         >
//           Add
//         </button>
//       </div>

//       <div className="w-full max-w-md h-96 bg-white shadow-2xl rounded-lg overflow-auto p-4">
//         <NotesBox />
//       </div>
//     </div>
//   );
// }

// export default Notes;

import React, { useEffect, useState } from "react";
import NotesBox from "../notesBox/NotesBox";
import { useDispatch } from "react-redux";
import {
  getAsyncThunk,
  postAsyncThunk,
} from "../../redux/redux.reducers.notes";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

function Notes() {
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!notes.trim()) return;
    dispatch(postAsyncThunk({ notes }));
    setNotes("");
  };

  useEffect(() => {
    dispatch(getAsyncThunk());
  }, [dispatch]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-6 flex-col gap-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-2xl">
          <CardContent className="p-4 space-y-4">
            <Textarea
              placeholder="Enter your note..."
              className="resize-none bg-white/10 border-white/30 text-white placeholder:text-white h-24"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button
              onClick={handleAdd}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90"
            >
              Add
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="w-full max-w-md"
      >
        <Card className="h-96 overflow-auto backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-2xl">
          <CardContent className="p-4">
            <NotesBox />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Notes;
