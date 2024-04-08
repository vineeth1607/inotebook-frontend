import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // fetch  a Note
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authentication-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwYzdmZTI3ZWY4Y2JlMDExOWQ1NjhiIn0sImlhdCI6MTcxMjA5NTIzMH0.eA8xSDWwUaJTO05ZL5En762Kpc868KllQaVFiuD1RQE" // Replace with your actual authentication token
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
  
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };
  
  // Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/postnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "authentication-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwYzdmZTI3ZWY4Y2JlMDExOWQ1NjhiIn0sImlhdCI6MTcxMjA5NTIzMH0.eA8xSDWwUaJTO05ZL5En762Kpc868KllQaVFiuD1RQE"
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json =  await response.json();

    console.log("Adding a new note")
    const note = {
      "_id": "61322f119553781a8ca8d0e08",
      "user": "6131dc5e3e4037cd4734a0664",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = (id) => {
    // TODO: API Call
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  // Editnote

    const editNote = async (id, description, title, tag) => {
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authentication-token": "your-auth-token-here" // Replace with your authentication token
        },
        body: JSON.stringify({ id, description, title, tag })
      });
      const json = await response.json();
    
      // Create a new array with the updated notes
      const updatedNotes = notes.map(note => {
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
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
