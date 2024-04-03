import React, { useState, useContext } from 'react';
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

    const [deleteHovered, setDeleteHovered] = useState(false);
    const [editHovered, setEditHovered] = useState(false);

    const deleteIconStyle = {
        border: deleteHovered ? "2px solid red" : "none",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
        backgroundColor: "transparent",
        display: "inline-flex", // Ensure the icons are displayed inline
        alignItems: "center",
        justifyContent: "center",
        marginRight: "5px" // Add margin to separate the icons
    };

    const editIconStyle = {
        border: editHovered ? "2px solid blue" : "none", // Add border on hover
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
        backgroundColor: "transparent",
        display: "inline-flex", // Ensure the icons are displayed inline
        alignItems: "center",
        justifyContent: "center",
    };

    const noteStyle = {
        display: "inline-block",
        margin: "10px",
        width: "250px",
        verticalAlign: "top"
    };

    return (
        <div style={noteStyle}>
            <Card style={{ width: "100%" }}>
                <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5-SQYpLphAzVZoMMX-JPWfLsgEV1h-iExRA&usqp=CAU" />
                <Card.Body>
                    <Button style={deleteIconStyle} onClick={() => deleteNote(note._id)} onMouseEnter={() => setDeleteHovered(true)} onMouseLeave={() => setDeleteHovered(false)}>
                        <DeleteIcon />
                        <span className={deleteHovered ? "hover-text" : "hide"}>Delete</span>
                    </Button>
                    <Button style={editIconStyle} onMouseEnter={() => setEditHovered(true)} onMouseLeave={() => setEditHovered(false)}>
                        <EditNoteIcon />
                        <span className={editHovered ? "hover-text" : "hide"}>Edit</span>
                    </Button>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>{note.description}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default NotesItem;
