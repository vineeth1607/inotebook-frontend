// NoteState.js
import React, { useState } from 'react';
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authentication-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwYzdmZTI3ZWY4Y2JlMDExOWQ1NjhiIn0sImlhdCI6MTcxMjA5NTIzMH0.eA8xSDWwUaJTO05ZL5En762Kpc868KllQaVFiuD1RQE"
        }
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  // Add a Note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/postnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authentication-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwYzdmZTI3ZWY4Y2JlMDExOWQ1NjhiIn0sImlhdCI6MTcxMjA5NTIzMH0.eA8xSDWwUaJTO05ZL5En762Kpc868KllQaVFiuD1RQE"
        },
        body: JSON.stringify({ title, description, tag })
      });

      const data = await response.json();

      // Check if notes is an array, if not initialize it as an empty array
      const updatedNotes = Array.isArray(notes) ? notes.concat(data) : [data];
      setNotes(updatedNotes);

      // Fetch the updated list of notes from the server
      await getNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      // Ensure that notes is always treated as an array
      const newNotes = Array.isArray(notes) ? notes.filter((note) => note._id !== id) : [];
      setNotes(newNotes);
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authentication-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwYzdmZTI3ZWY4Y2JlMDExOWQ1NjhiIn0sImlhdCI6MTcxMjA5NTIzMH0.eA8xSDWwUaJTO05ZL5En762Kpc868KllQaVFiuD1RQE"
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to delete note with id ${id}`);
      }
      await getNotes(); // Fetch the updated list of notes from the server
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  

  const editNote = async (id, description, title, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authentication-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwYzdmZTI3ZWY4Y2JlMDExOWQ1NjhiIn0sImlhdCI6MTcxMjA5NTIzMH0.eA8xSDWwUaJTO05ZL5En762Kpc868KllQaVFiuD1RQE"
        },
        body: JSON.stringify({ id, description, title, tag })
      });
      const json = await response.json();
      const updatedNotes = notes.map((note) => {
        if (note._id === id) {
          return {
            ...note,
            title,
            description,
            tag
          };
        }
        return note;
      });
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
