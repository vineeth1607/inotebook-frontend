import React, { useContext, useEffect } from 'react';
import NoteContext from "../context/notes/NoteContext"
import AddNote from './AddNote';
import NotesItem from './NotesItem';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;
  
  useEffect(() => {
    getNotes();
  }, []);

  console.log("Notes array:", notes); // Add this line to log the notes array

  // Check if notes is an array and has elements or if it's an object with a notes array
  if (!Array.isArray(notes) || (Array.isArray(notes) && notes.length === 0) || (typeof notes === 'object' && Array.isArray(notes.notes) && notes.notes.length === 0)) {
    return (
      <>
        <AddNote />
        <div className="row my-3">
          <h2>Your Notes</h2>
          <p>No notes found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {Array.isArray(notes) ? notes.map((note) => <NotesItem key={note._id} note={note} />) : notes.notes.map((note) => <NotesItem key={note._id} note={note} />)}
      </div>
    </>
  );
}

export default Notes;
