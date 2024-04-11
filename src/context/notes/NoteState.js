import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // fetch  a Note
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authentication-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwYzdmZTI3ZWY4Y2JlMDExOWQ1NjhiIn0sImlhdCI6MTcxMjA5NTIzMH0.eA8xSDWwUaJTO05ZL5En762Kpc868KllQaVFiuD1RQE"
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
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

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      // Optimistically update state
      const newNotes = Array.isArray(notes)
        ? notes.filter((note) => note._id !== id)
        : [];
      setNotes(newNotes);

      // Make the API call for deletion
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authentication-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwYzdmZTI3ZWY4Y2JlMDExOWQ1NjhiIn0sImlhdCI6MTcxMjA5NTIzMH0.eA8xSDWwUaJTO05ZL5En762Kpc868KllQaVFiuD1RQE"
        }
      });

      // Handle response
      if (response.ok) {
        // Fetch the updated list of notes from the server
        await getNotes();
      } else {
        // If deletion fails, revert state
        setNotes([...notesInitial]);
        console.error("Failed to delete note with id", id);
      }
    } catch (error) {
      // Revert state if an error occurs
      setNotes([...notesInitial]);
      console.error("Error deleting note:", error);
    }
  };

  // Edit Note
  const editNote = async (id, description, title, tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authentication-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwYzdmZTI3ZWY4Y2JlMDExOWQ1NjhiIn0sImlhdCI6MTcxMjA5NTIzMH0.eA8xSDWwUaJTO05ZL5En762Kpc868KllQaVFiuD1RQE"
        },
        body: JSON.stringify({ id, description, title, tag })
      }
    );
    const json = await response.json();
    // Create a new array with the updated notes
    const updatedNotes = notes.map((note) => {
      if (note._id === id) {
        return {
          ...note,
          title: title,
          description: description,
          tag: tag
        };
      }
      return note;
    });
    // Set the state with the new array of notes
    setNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
