import React, { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import NoteContext from '../context/notes/NoteContext';

const NotesItem = ({ note, setModalShow }) => {
    const { deleteNote, updateNote } = useContext(NoteContext); // Import updateNote from context
    const [editedNote, setEditedNote] = useState(note);

    const handleEdit = () => {
        setModalShow(true);
        // Set editedNote to the current note data when edit button is clicked
        setEditedNote({
            _id: note._id, // Ensure _id is included when setting editedNote
            title: note.title,
            description: note.description,
            tag: note.tag
          });
          
    };
    
    const handleChange = (e) => {
        setEditedNote({
            ...editedNote,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateNote = () => {
        updateNote(editedNote); // Call the updateNote function
        setModalShow(false);
    };

    return (
        <div className="note-item">
            <Card className="custom-card">
                <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5-SQYpLphAzVZoMMX-JPWfLsgEV1h-iExRA&usqp=CAU" />
                <Card.Body className="card-body">
                    <Button className="delete-icon" onClick={() => deleteNote(note._id)}>
                        <DeleteIcon />
                    </Button>
                    <Button className="edit-icon" onClick={handleEdit}>
                        <EditNoteIcon />
                    </Button>
                    <Card.Title className="card-title">{note.title}</Card.Title>
                    <Card.Text className="card-text">{note.description}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default NotesItem;
