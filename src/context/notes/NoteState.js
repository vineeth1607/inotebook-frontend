import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [ {
    "_id": "1",
    "user": "user1",
    "title": "Note 1",
    "description": "Description for Note 1",
    "tag": "Tag 1",
    "date": "2021-01-01T00:00:00.000Z",
    "__v": 0
  },
  {
    "_id": "2",
    "user": "user2",
    "title": "Note 2",
    "description": "Description for Note 2",
    "tag": "Tag 2",
    "date": "2021-01-02T00:00:00.000Z",
    "__v": 0
  }];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "authentication-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwYzdmZTI3ZWY4Y2JlMDExOWQ1NjhiIn0sImlhdCI6MTcxMjA5NTIzMH0.eA8xSDWwUaJTO05ZL5En762Kpc868KllQaVFiuD1RQE"
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/postnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authentication-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwYzdmZTI3ZWY4Y2JlMDExOWQ1NjhiIn0sImlhdCI6MTcxMjA5NTIzMH0.eA8xSDWwUaJTO05ZL5En762Kpc868KllQaVFiuD1RQE"
        },
        body: JSON.stringify({ title, description, tag })
      });
      if (!response.ok) {
        throw new Error('Failed to add note');
      }
      console.log("Adding a new note");
      
      // Include the newly added note in the state
      
      const newNote = await response.json();
      setNotes([...notes, newNote]);
   
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "authentication-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwYzdmZTI3ZWY4Y2JlMDExOWQ1NjhiIn0sImlhdCI6MTcxMjA5NTIzMH0.eA8xSDWwUaJTO05ZL5En762Kpc868KllQaVFiuD1RQE"
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
      console.log("Deleting the note with id", id);
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "authentication-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwYzdmZTI3ZWY4Y2JlMDExOWQ1NjhiIn0sImlhdCI6MTcxMjA5NTIzMH0.eA8xSDWwUaJTO05ZL5En762Kpc868KllQaVFiuD1RQE"
        },
        body: JSON.stringify({ title, description, tag })
      });
      if (!response.ok) {
        throw new Error('Failed to edit note');
      }
      const updatedNote = await response.json();
      const updatedNotes = notes.map(note => (note._id === id ? updatedNote : note));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
