import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../App.css';

const AddNote = () => {
  const { addNote } = useContext(NoteContext);

  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const handleClick = async (e) => {
    e.preventDefault();
    const { title, description, tag } = note;
    await addNote(title, description, tag);
    setNote({ title: '', description: '', tag: '' });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className='container mb-3'>
      <h3 className='my-1'>Add a note</h3>
      <Form>
        <Form.Group className='mb-' controlId='title'>
          <Form.Label>Notes Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your title here'
            name='title'
            value={note.title}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Enter your description here'
            name='description'
            value={note.description}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className='mb-' controlId='tag'>
          <Form.Label>Tag</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your tag here'
            name='tag'
            value={note.tag}
            onChange={onChange} // Add this onChange event handler
          />
        </Form.Group>
        <Button className='margin-top' variant='primary' type='button' onClick={handleClick}>
          Save Note
        </Button>
      </Form>
    </div>
  );
};

export default AddNote;
