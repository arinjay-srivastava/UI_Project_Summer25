import React, { useState, useEffect } from 'react';
import UserList from './UserList';

function ProfilePage() {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserName(storedUser.userName);
      setUserId(storedUser._id);
      fetchUserNotes(storedUser._id);
    }
  }, []);

  const fetchUserNotes = async (userId) => {
    try {
      const response = await fetch('http://localhost:3000/api/note/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId: userId })
      });
      const data = await response.json();
      if (data.notes) setNotes(data.notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/note/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, content })
      });
      const data = await response.json();
      if (response.ok) {
        setNotes([...notes, data.note]);
        setContent('');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await fetch('http://localhost:3000/api/note/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId })
      });
      if (response.ok) {
        setNotes(notes.filter(note => note._id !== noteId));
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const updateNote = async (noteId) => {
    console.log('Sending update:', { noteId, content: editContent });
    try {
      const response = await fetch('http://localhost:3000/api/note/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId, content: editContent })
      });
      const data = await response.json();
      console.log('Update response:', data);
      if (response.ok) {
        setNotes(notes.map(note =>
          note._id === noteId ? { ...note, content: data.note.content } : note
        ));
        setEditNoteId(null);
        setEditContent('');
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h2>Welcome, {userName}</h2>

        <form onSubmit={handleCreateNote}>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">Add Note</button>
        </form>

        <h4 className="mt-4">Your Notes</h4>
        <ul className="list-group">
          {notes.map((note) => (
            <li key={note._id} className="list-group-item">
              {editNoteId === note._id ? (
                <div>
                  <textarea
                    className="form-control mb-2"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => updateNote(note._id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setEditNoteId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  {note.content}
                  <div>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => {
                        setEditNoteId(note._id);
                        setEditContent(note.content);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteNote(note._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <UserList currentUserId={userId} />
    </div>
  );
}

export default ProfilePage;
