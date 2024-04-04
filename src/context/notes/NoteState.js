import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  // const host = "http://localhost:5000";
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
  },  {
    "_id": "61322f195153781a8ca8d0e06",
    "user": "6131dc5e3e4037cd4734a066",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2021-09-03T14:20:09.509Z",
    "__v": 0
  },
  {
    "_id": "61322f195531781a8ca8d0e08",
    "user": "6131dc5e3e4037cd4734a066",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2021-09-03T14:20:09.668Z",
    "__v": 0
  },
  {
    "_id": "61322f19553781a8ca8d0e081",
    "user": "6131dc5e3e4037cd4734a066",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2021-09-03T14:20:09.668Z",
    "__v": 0
  },
  {
    "_id": "61322f19553781a8ca8d0e082",
    "user": "6131dc5e3e4037cd4734a066",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2021-09-03T14:20:09.668Z",
    "__v": 0
  },
  {
    "_id": "61322f195537812a8ca8d0e08",
    "user": "6131dc5e3e4037cd4734a066",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2021-09-03T14:20:09.668Z",
    "__v": 0
  },
  {
    "_id": "613222f19553781a8ca8d0e08",
    "user": "6131dc5e3e4037cd4734a066",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2021-09-03T14:20:09.668Z",
    "__v": 0
  },
  {
    "_id": "61322f119553781a8ca8d0e08",
    "user": "6131dc5e3e4037cd4734a066",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2021-09-03T14:20:09.668Z",
    "__v": 0
  }
];
  const [notes, setNotes] = useState(notesInitial);

  // Add a Note
  const addNote = async (title, description, tag) => {
    
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
  const deleteNote = (id)=>{
    // TODO: API Call
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
  }
  

  // Editnote
  const editNote =(id, description,title, tag)=>{

    //logic to edit at client side 
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id )
      element.title = title
      element.description = description
      element.tag = tag
    }

  }

 
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
