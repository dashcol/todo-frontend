import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  notesSelector,
  deleteAsyncThunk,
  postAsyncThunk,
} from "../../redux/redux.reducers.notes";

function NotesBox() {
  const [noteInput, setNoteInput] = useState("");
  const notes = useSelector(notesSelector);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteAsyncThunk(id));
  };

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    dispatch(postAsyncThunk({ notes: noteInput }));
    setNoteInput("");
  };

  return (
    <div className="flex flex-col gap-3">
      {notes.length === 0 ? (
        <p className="text-gray-500 text-center">No notes available</p>
      ) : (
        notes.map((note) => (
          <div
            key={note._id}
            className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-md gap-2"
          >
            <p className="text-lg text-gray-900 font-semibold">{note.notes}</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500 bg-white px-2 py-1 rounded-md shadow-sm">
                {new Date(note.createdOn).toLocaleDateString()} at{" "}
                {new Date(note.createdOn).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <button
                onClick={() => handleDelete(note._id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default NotesBox;
