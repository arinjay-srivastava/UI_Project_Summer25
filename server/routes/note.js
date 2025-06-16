const express = require("express");
const mongoose = require("mongoose");
const { createNote, getNote, updateNote, deleteNote } = require('../models/note');
const router = express.Router();

router
  .post('/create', async (req, res) => {
    try {
      console.log('Create note request body:', req.body); // Debug log
      if (!req.body) {
        return res.status(400).send({ message: 'Request body is missing' });
      }
      const { userId, content } = req.body;
      if (!userId || !content) {
        return res.status(400).send({ message: 'User ID and content are required' });
      }
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).send({ message: 'Invalid user ID format' });
      }
      const note = await createNote(userId, content);
      res.send({ message: 'Note created', ...note });
    } catch (error) {
      console.log('Create note error:', error); // Debug log
      res.status(401).send({ message: error.message });
    }
  })

  .post('/read', async (req, res) => {
    try {
      console.log('Read note request body:', req.body); // Debug log
      if (!req.body) {
        return res.status(400).send({ message: 'Request body is missing' });
      }
      const { noteId } = req.body;
      if (!noteId) {
        return res.status(400).send({ message: 'Note ID is required' });
      }
      if (!mongoose.isValidObjectId(noteId)) {
        return res.status(400).send({ message: 'Invalid note ID format' });
      }
      const note = await getNote(noteId);
      res.send({ message: 'Note retrieved', ...note });
    } catch (error) {
      console.log('Read note error:', error); // Debug log
      res.status(401).send({ message: error.message });
    }
  })

  .put('/update', async (req, res) => {
    try {
      console.log('Update note request body:', req.body); // Debug log
      if (!req.body) {
        return res.status(400).send({ message: 'Request body is missing' });
      }
      const { noteId, content } = req.body;
      if (!noteId || !content) {
        return res.status(400).send({ message: 'Note ID and content are required' });
      }
      if (!mongoose.isValidObjectId(noteId)) {
        return res.status(400).send({ message: 'Invalid note ID format' });
      }
      const note = await updateNote(noteId, content);
      res.send({ message: 'Note updated', ...note });
    } catch (error) {
      console.log('Update note error:', error); // Debug log
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      console.log('Delete note request body:', req.body); // Debug log
      if (!req.body) {
        return res.status(400).send({ message: 'Request body is missing' });
      }
      const { noteId } = req.body;
      if (!noteId) {
        return res.status(400).send({ message: 'Note ID is required' });
      }
      if (!mongoose.isValidObjectId(noteId)) {
        return res.status(400).send({ message: 'Invalid note ID format' });
      }
      const note = await deleteNote(noteId);
      res.send({ message: 'Note deleted', ...note });
    } catch (error) {
      console.log('Delete note error:', error); // Debug log
      res.status(401).send({ message: error.message });
    }
  });

module.exports = router;