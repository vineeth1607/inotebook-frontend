import React, { useContext, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import NoteContext from '../context/notes/NoteContext';

const NotesItem = ({ note, setModalShow }) => {
    const { deleteNote, updateNote } = useContext(NoteContext);
    const [editedNote, setEditedNote] = useState({}); // Initialize state with an empty object

    // Update editedNote state whenever the note prop changes
    useEffect(() => {
        setEditedNote({
            _id: note._id,
            title: note.title,
            description: note.description,
            tag: note.tag
        });
    }, [note]);

    const handleEdit = () => {
        setModalShow(true);
    };
    
    
    const handleChange = (e) => {
        setEditedNote({
            ...editedNote,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateNote = () => {
        updateNote(editedNote);
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
                    <Card.Title className="card-title">{editedNote.title}</Card.Title>
                    <Card.Text className="card-text">{editedNote.description}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default NotesItem;
