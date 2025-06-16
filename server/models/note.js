const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deleted: { type: Boolean, default: false }
});

const Note = mongoose.model('Note', noteSchema);

// CREATE a note
async function createNote(userId, content) {
  if (!mongoose.isValidObjectId(userId)) {
    throw Error('Invalid user ID format');
  }
  const user = await mongoose.model('User').findById(userId);
  if (!user) throw Error('User not found');
  const note = await Note.create({
    content,
    userId,
    deleted: false
  });
  return note;
}

// READ a note
async function getNote(noteId) {
  if (!mongoose.isValidObjectId(noteId)) {
    throw Error('Invalid note ID format');
  }
  const note = await Note.findById(noteId);
  if (!note || note.deleted) throw Error('Note not found');
  return note;
}

// UPDATE a note
async function updateNote(noteId, content) {
  if (!mongoose.isValidObjectId(noteId)) {
    throw Error('Invalid note ID format');
  }
  const note = await Note.findOneAndUpdate(
    { _id: noteId, deleted: false },
    { $set: { content } },
    { new: true }
  );
  if (!note) throw Error('Note not found');
  return note;
}

// DELETE a note (soft delete)
async function deleteNote(noteId) {
  if (!mongoose.isValidObjectId(noteId)) {
    throw Error('Invalid note ID format');
  }
  const note = await Note.findOneAndUpdate(
    { _id: noteId, deleted: false },
    { $set: { deleted: true } },
    { new: true }
  );
  if (!note) throw Error('Note not found');
  return note;
}

module.exports = { createNote, getNote, updateNote, deleteNote };