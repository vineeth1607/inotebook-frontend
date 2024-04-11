// Notes.js
import React, { useContext, useEffect, useState } from 'react';
import NoteContext from "../context/notes/NoteContext"
import AddNote from './AddNote';
import NotesItem from './NotesItem';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    getNotes();
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const [editedNote, setEditedNote] = useState({ _id: '', title: '', description: '', tag: '' });

  const handleClick = async (e) => {
    e.preventDefault();
    if (editedNote._id && editedNote._id.trim() !== '') {
      editNote(editedNote._id, editedNote.description, editedNote.title, editedNote.tag);
      setModalShow(false);
    } else {
      console.error("Note ID is undefined or empty");
    }
  };

  const handleChange = (e) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit note
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={editedNote.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={editedNote.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTag">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tag"
                name="tag"
                value={editedNote.tag}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {Array.isArray(notes) ? (
          notes.map((note, index) => (
            <NotesItem key={index} note={note} setModalShow={setModalShow} />
          ))
        ) : (
          notes && notes.notes.map((note, index) => (
            <NotesItem key={index} note={note} setModalShow={setModalShow} />
          ))
        )}
      </div>
    </>
  );
}

export default Notes;
