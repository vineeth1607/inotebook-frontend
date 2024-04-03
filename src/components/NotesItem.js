import React, { useState,useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'; // Import Button component from Material-UI
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon component from Material-UI Icons
import EditNoteIcon from '@mui/icons-material/EditNote';
import '../App.css';
import NoteContext from '../context/notes/NoteContext';

const NotesItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note } = props;

    const [deleteHovered, setDeleteHovered] = useState(false);
    const [editHovered, setEditHovered] = useState(false);

    return (
        <div>
            <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5-SQYpLphAzVZoMMX-JPWfLsgEV1h-iExRA&usqp=CAU" />
                <Card.Body>
                    <Button className="icon-container" onClick={() => deleteNote(note._id)}>
                        <DeleteIcon
                            onMouseEnter={() => setDeleteHovered(true)}
                            onMouseLeave={() => setDeleteHovered(false)}
                        />
                        <span className={deleteHovered ? "hover-text" : "hide"}>Delete</span>
                    </Button>
                    <Button className="icon-container">
                        <EditNoteIcon
                            onMouseEnter={() => setEditHovered(true)}
                            onMouseLeave={() => setEditHovered(false)}
                        />
                        <span className={editHovered ? "hover-text" : "hide"}>Edit</span>
                    </Button>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>
                        {note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam consequatur sit consectetur quisquam neque sunt molestiae libero, illo cumque, ex quia, veniam sed accusantium aut modi. Voluptate amet exercitationem aliquid!
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Grid container sx={{ color: 'text.primary' }}>
                        <Grid item xs={8}>

                        </Grid>
                    </Grid>
                </Card.Body>
            </Card>
        </div>
    );
};

export default NotesItem;
