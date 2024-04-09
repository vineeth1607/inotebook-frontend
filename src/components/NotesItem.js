import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import NoteContext from '../context/notes/NoteContext';
import '../App.css';

const NotesItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note } = props;

    return (
        <div className="note-item">
            <Card className="custom-card">
                <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5-SQYpLphAzVZoMMX-JPWfLsgEV1h-iExRA&usqp=CAU" />
                <Card.Body className="card-body">
                    <Button className="delete-icon" onClick={() => deleteNote(note._id)}>
                        <DeleteIcon />
                    </Button>
                    <Button className="edit-icon">
                        <EditNoteIcon  />
                    </Button>
                    <Card.Title className="card-title">{note.title}</Card.Title>
                    <Card.Text className="card-text">{note.description}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default NotesItem;
