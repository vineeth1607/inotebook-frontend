// Notes.js
import React, { useContext } from 'react';
import NoteContext from "../context/notes/NoteContext"
import AddNote from './AddNote';
import NotesItem from './NotesItem';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes } = context

  console.log("Notes array:", notes); // Add this line to log the notes array

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Notes</h2> 
        {notes.map((note) => {
          return <NotesItem key={note._id} note={note}/>  
        })}
      </div>
    </>
  );
}

export default Notes;