import React, { useEffect, useState } from "react";
import NotesBox from "../notesBox/NotesBox";
import { useDispatch } from "react-redux";
import {
  getAsyncThunk,
  postAsyncThunk,
} from "../../redux/redux.reducers.notes";

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex-col gap-6 p-6">
      <div className="flex gap-4 w-full max-w-md bg-white shadow-2xl rounded-lg p-4 flex-col">
        <textarea
          className="flex-1 bg-gray-100 h-24 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all resize-none"
          value={notes}
          placeholder="Enter your note..."
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md transition-all hover:bg-indigo-600 active:scale-95"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <div className="w-full max-w-md h-96 bg-white shadow-2xl rounded-lg overflow-auto p-4">
        <NotesBox />
      </div>
    </div>
  );
}

export default Notes;
