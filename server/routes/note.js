const express = require('express');
const { createNote, getNote, updateNote, deleteNote } = require('../models/note');
const router = express.Router();

// CREATE a note 
router.post('/create', async (req, res) => {
  const { userId, content } = req.body;
  try {
    const note = await createNote(userId, content);
    res.send({ message: 'Note created', note });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// READ a note
router.post('/read', async (req, res) => {
  const { noteId } = req.body;
  try {
    const note = await getNote(noteId);
    res.send({ message: 'Note found', note });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// UPDATE a note
router.put('/update', async (req, res) => {
  const { noteId, content } = req.body;
  try {
    const note = await updateNote(noteId, content);
    res.send({ message: 'Note updated', note });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// DELETE a note
router.delete('/delete', async (req, res) => {
  const { noteId } = req.body;
  try {
    const note = await deleteNote(noteId);
    res.send({ message: 'Note deleted', note });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;